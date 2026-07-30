"""
Turns the originals in assets-src/ into size-capped WebP in public/assets/.

Run:  python scripts/optimise-images.py
      python scripts/optimise-images.py --force    (ignore the mtime cache)

Design notes
------------
* Per-category tiers and crops. A circular portrait and a full-bleed hero want
  different aspect ratios and different maximum widths, so the category folder
  decides both — see SPECS.
* It will NOT upscale. Emitting a 3200px tier from a 1400px original produces a
  soft file that is bigger than the original and looks worse; the script warns
  and skips the tier instead. This is why assets-src/README.md states a minimum
  size per folder.
* Unchanged sources are skipped by comparing mtimes against the outputs, so
  re-running after adding one photo costs almost nothing.
* Nothing here is imported by the app. It is a build-time tool, deliberately
  kept as a standalone script (like scripts/build-logo-assets.py) so the project
  needs no image-processing npm dependency.
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
SRC_ROOT = ROOT / "assets-src"
OUT_ROOT = ROOT / "public" / "assets"
HERO_CSS = ROOT / "src" / "styles" / "hero-image.css"
MANIFEST = ROOT / "src" / "utils" / "imageManifest.js"

WEBP_QUALITY = 82
JPEG_QUALITY = 84

# category -> (aspect ratio w/h, widths, also_emit_jpeg)
SPECS = {
    "hero":       (16 / 9,  (1600, 2400, 3200), True),
    "faculty":    (1 / 1,   (320, 640),         False),
    "courses":    (16 / 10, (400, 800),         False),
    "facilities": (16 / 9,  (400, 800, 1200),   False),
    "news":       (16 / 9,  (400, 800),         False),
    "events":     (16 / 9,  (400, 800),         False),
}

SOURCE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}


def centre_crop(im, ratio):
    """Crop to `ratio` (w/h) around the centre, keeping as much as possible."""
    w, h = im.size
    current = w / h
    if abs(current - ratio) < 1e-3:
        return im
    if current > ratio:          # too wide -> trim sides
        new_w = round(h * ratio)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / ratio)     # too tall -> trim top/bottom
    top = (h - new_h) // 2
    return im.crop((0, top, w, top + new_h))


def outputs_are_fresh(src, targets):
    """True when every target exists and is newer than the source."""
    if not targets:
        return False
    src_mtime = src.stat().st_mtime
    return all(t.exists() and t.stat().st_mtime >= src_mtime for t in targets)


def process(src, category, force):
    ratio, widths, want_jpeg = SPECS[category]
    out_dir = OUT_ROOT / category
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = src.stem

    with Image.open(src) as probe:
        src_w, src_h = probe.size

    usable = [w for w in widths if w <= src_w]
    skipped = [w for w in widths if w > src_w]

    if not usable:
        print(f"  SKIP  {category}/{src.name}  ({src_w}px wide — smaller than "
              f"the {min(widths)}px minimum for this folder)")
        return None

    targets = [out_dir / f"{stem}-{w}.webp" for w in usable]
    if want_jpeg:
        targets.append(out_dir / f"{stem}-fallback.jpg")

    if not force and outputs_are_fresh(src, targets):
        print(f"  ok    {category}/{src.name}  (unchanged)")
        return None

    src_bytes = src.stat().st_size
    written = []

    with Image.open(src) as im:
        im = im.convert("RGB")
        im = centre_crop(im, ratio)

        for w in usable:
            h = round(w / ratio)
            out = out_dir / f"{stem}-{w}.webp"
            im.resize((w, h), Image.LANCZOS).save(
                out, "WEBP", quality=WEBP_QUALITY, method=6
            )
            written.append(out)

        if want_jpeg:
            # Ultimate fallback for the CSS background stack. Sized to the
            # smallest tier — anything that can't do WebP isn't getting 3200px.
            w = usable[0]
            out = out_dir / f"{stem}-fallback.jpg"
            im.resize((w, round(w / ratio)), Image.LANCZOS).save(
                out, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True
            )
            written.append(out)

    total_out = sum(p.stat().st_size for p in written)
    note = ""
    if skipped:
        note = f"   (no {'/'.join(str(s) for s in skipped)}px tier — source is only {src_w}px)"
    print(f"  built {category}/{src.name}  {src_w}x{src_h}  "
          f"{src_bytes / 1024:7.0f} KB -> {total_out / 1024:6.0f} KB "
          f"across {len(written)} files{note}")
    return src_bytes, total_out


def write_manifest(available):
    """
    Record which tiers actually exist, per base name.

    Without this, utils/imageSrc.js would emit a srcset containing every tier in
    the category — including ones the no-upscale rule skipped for an undersized
    source. The browser could then pick a URL that 404s, which fails the whole
    <img> and silently drops the photograph to the gradient fallback. With the
    manifest, the srcset only ever lists files that were written, and a source
    that produced nothing resolves to no image at all (so there is no wasted
    request either).
    """
    entries = "\n".join(
        f"  '{base}': [{', '.join(str(w) for w in widths)}],"
        for base, widths in sorted(available.items())
    )
    body = entries if entries else "  /* no images processed yet */"
    css = (
        "/*\n"
        " * GENERATED by scripts/optimise-images.py — do not edit.\n"
        " *\n"
        " * Maps an image base name to the widths that were actually generated.\n"
        " * utils/imageSrc.js consults this so a srcset never advertises a tier\n"
        " * that the no-upscale rule skipped.\n"
        " */\n\n"
        "export const imageManifest = {\n"
        f"{body}\n"
        "};\n"
    )
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(css, encoding="utf-8", newline=chr(10))
    print(f"\nmanifest: {len(available)} image(s) -> src/utils/imageManifest.js")


HERO_CSS_DEFAULT = """/* ==========================================================================
   Hero photograph source

   GENERATED — scripts/optimise-images.py rewrites this file. Edit assets-src/
   and re-run the script rather than editing here.

   It exists as its own file so the hero can reference responsive WebP tiers
   without Hero.css hard-coding filenames that may not have been generated yet.
   Hero.css consumes it as `var(--hero-image)`.

   Current state: no image in assets-src/hero/ — using the original JPEG.
   ========================================================================== */

:root {
  --hero-image: url(/assets/hero_bg.jpg);
}
"""


def reset_hero_css():
    """
    Restore the default when assets-src/hero/ is empty.

    Without this, removing a hero source left this file pointing at tiers that
    no longer exist — the hero would 404 and render as a bare gradient. The
    generated file has to be reset, not just written on success.
    """
    if HERO_CSS.exists() and "no image in assets-src/hero/" in HERO_CSS.read_text(encoding="utf-8"):
        return  # already at the default
    HERO_CSS.write_text(HERO_CSS_DEFAULT, encoding="utf-8", newline=chr(10))
    print("hero: no source — src/styles/hero-image.css reset to /assets/hero_bg.jpg")


def write_hero_css(stem, widths):
    """
    Point --hero-image at the generated tiers.

    Hero.css consumes this as var(--hero-image) rather than naming files itself,
    so the hero never references a tier that hasn't been generated. image-set
    picks the DPR; the media query picks the width tier. A plain url() is listed
    first as the pre-image-set fallback.
    """
    small = widths[0]
    large = widths[-1]
    mid = widths[1] if len(widths) > 2 else large
    p = f"/assets/hero/{stem}"

    css = f"""/* ==========================================================================
   Hero photograph source

   GENERATED by scripts/optimise-images.py from assets-src/hero/{stem}.*
   Do not edit — re-run the script instead.

   Hero.css consumes this as var(--hero-image). Keeping the filenames here means
   Hero.css never names a tier that might not exist yet.
   ========================================================================== */

:root {{
  --hero-image: url({p}-{small}.webp);
  --hero-image: image-set(url({p}-{small}.webp) 1x, url({p}-{large}.webp) 2x);
}}

@media (min-width: 1281px) {{
  :root {{
    --hero-image: url({p}-{mid}.webp);
    --hero-image: image-set(url({p}-{mid}.webp) 1x, url({p}-{large}.webp) 2x);
  }}
}}
"""
    HERO_CSS.write_text(css, encoding="utf-8", newline=chr(10))
    print(f"  wrote src/styles/hero-image.css -> {stem} tiers")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true",
                    help="rebuild even when outputs look up to date")
    args = ap.parse_args()

    if not SRC_ROOT.exists():
        sys.exit(f"{SRC_ROOT} does not exist — create it and add originals.")

    total_in = total_out = 0
    built = 0
    found_any = False
    available = {}          # 'courses/msk' -> [400, 800]
    hero_seen = False

    for category in SPECS:
        src_dir = SRC_ROOT / category
        if not src_dir.is_dir():
            continue
        sources = sorted(
            p for p in src_dir.iterdir()
            if p.is_file() and p.suffix.lower() in SOURCE_SUFFIXES
        )
        if not sources:
            continue
        found_any = True
        print(f"\n{category}/")
        for src in sources:
            result = process(src, category, args.force)
            if result:
                total_in += result[0]
                total_out += result[1]
                built += 1

            with Image.open(src) as probe:
                src_w = probe.size[0]
            usable = [w for w in SPECS[category][1] if w <= src_w]
            if usable:
                available[f"{category}/{src.stem}"] = usable
                if category == "hero":
                    write_hero_css(src.stem, usable)
                    hero_seen = True

    if not hero_seen:
        reset_hero_css()

    write_manifest(available)

    if not found_any:
        print("No source images found.\n")
        print(f"Drop originals into {SRC_ROOT.relative_to(ROOT)}/<category>/ and re-run.")
        print(f"Categories: {', '.join(SPECS)}")
        print("\nThe site renders gradient-and-icon fallbacks until then, so")
        print("nothing is broken in the meantime.")
        return

    if built:
        saved = total_in - total_out
        pct = 100 * saved / total_in if total_in else 0
        # Phrase the direction explicitly: a signed percentage on a size
        # reduction reads as though the files got bigger.
        verb = "smaller" if saved >= 0 else "LARGER"
        print(f"\n{built} image(s) processed: "
              f"{total_in / 1024:.0f} KB -> {total_out / 1024:.0f} KB "
              f"({abs(pct):.0f}% {verb}, {abs(saved) / 1024:.0f} KB)")
    else:
        print("\nEverything already up to date. Use --force to rebuild.")


if __name__ == "__main__":
    main()
