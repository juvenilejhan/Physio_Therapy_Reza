"""
Generates the transparent BAHIR crest assets from public/assets/logo.jpeg.

Run:  python scripts/build-logo-assets.py

Why flood-fill and not a chroma key
-----------------------------------
The source is a crest photographed on textured paper: the background ranges
R 230-253 / G 223-252 / B 213-248, and the crest itself contains light areas
(book pages, gold rim, banner text) that fall inside that same range. A global
"remove everything near cream" pass therefore punches holes straight through
the artwork.

Flood-filling inward from the border only removes background that is actually
*connected* to the edge, so enclosed light detail survives. A second pass
sweeps small fully-enclosed cream pockets (the gaps between laurel leaves),
and the alpha is feathered across the crest's drop shadow so there is no hard
grey halo.
"""

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "assets" / "logo.jpeg"
OUT = ROOT / "public" / "assets"

BG = (243, 239, 233)      # measured border mean
CORE_TOL = 26             # fully transparent at or below this distance
FEATHER_TOL = 62          # ramps to fully opaque by here (kills the shadow halo)
POCKET_MAX = 1400         # enclosed cream islands smaller than this are cleared


def dist(p, c=BG):
    return max(abs(p[0] - c[0]), abs(p[1] - c[1]), abs(p[2] - c[2]))


def background_mask(px, w, h):
    """Flood fill from every border pixel. Returns a bytearray, 1 = background."""
    mask = bytearray(w * h)
    dq = deque()
    for x in range(w):
        dq.append((x, 0))
        dq.append((x, h - 1))
    for y in range(h):
        dq.append((0, y))
        dq.append((w - 1, y))

    while dq:
        x, y = dq.popleft()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        i = y * w + x
        if mask[i]:
            continue
        if dist(px[x, y]) > CORE_TOL:
            continue
        mask[i] = 1
        dq.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return mask


def clear_pockets(mask, px, w, h):
    """Remove small enclosed cream regions the border fill couldn't reach."""
    seen = bytearray(w * h)
    cleared = 0
    for sy in range(h):
        for sx in range(w):
            i0 = sy * w + sx
            if seen[i0] or mask[i0] or dist(px[sx, sy]) > CORE_TOL:
                continue
            region, dq = [], deque([(sx, sy)])
            seen[i0] = 1
            while dq:
                x, y = dq.popleft()
                region.append(y * w + x)
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        j = ny * w + nx
                        if not seen[j] and not mask[j] and dist(px[nx, ny]) <= CORE_TOL:
                            seen[j] = 1
                            dq.append((nx, ny))
            if len(region) <= POCKET_MAX:
                for j in region:
                    mask[j] = 1
                cleared += 1
    return cleared


def build_alpha(mask, px, w, h):
    """Binary mask -> feathered alpha, so the drop shadow fades instead of ringing."""
    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        row = y * w
        for x in range(w):
            if mask[row + x]:
                ap[x, y] = 0
                continue
            d = dist(px[x, y])
            if d < FEATHER_TOL:
                # ramp 0 -> 255 across the shadow band
                ap[x, y] = int(255 * max(0.0, (d - CORE_TOL) / (FEATHER_TOL - CORE_TOL)))
    return alpha.filter(ImageFilter.GaussianBlur(0.6))


def main():
    im = Image.open(SRC).convert("RGB")
    w, h = im.size
    px = im.load()
    print(f"source {SRC.name}  {w}x{h}")

    mask = background_mask(px, w, h)
    removed = sum(mask)
    print(f"  border flood-fill: {100 * removed / (w * h):.1f}% removed")

    pockets = clear_pockets(mask, px, w, h)
    print(f"  enclosed pockets cleared: {pockets}")

    rgba = im.convert("RGBA")
    rgba.putalpha(build_alpha(mask, px, w, h))

    bbox = rgba.getbbox()
    rgba = rgba.crop(bbox)
    print(f"  trimmed to {rgba.size[0]}x{rgba.size[1]}")

    # square it so every downscale stays centred
    side = max(rgba.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(rgba, ((side - rgba.size[0]) // 2, (side - rgba.size[1]) // 2))

    # 56/112 = navbar 1x/2x, 72/192 = footer 1x/2x. A 512 variant was
    # dropped: nothing displays the crest that large and it cost 331 KB.
    for size in (192, 112, 72, 56):
        out = OUT / f"logo-{size}.png"
        square.resize((size, size), Image.LANCZOS).save(out, optimize=True)
        print(f"  wrote {out.name:<16} {out.stat().st_size / 1024:6.1f} KB")

    # Favicon: the shield alone. The full crest turns to mud below ~56px —
    # the laurel ring and banner text are unreadable at 32px and actively
    # muddy the silhouette, so the favicon drops them.
    sw, sh = square.size
    shield = square.crop(
        (int(sw * 0.275), int(sh * 0.125), int(sw * 0.725), int(sh * 0.715))
    )
    fs = max(shield.size)
    shield_sq = Image.new("RGBA", (fs, fs), (0, 0, 0, 0))
    shield_sq.paste(shield, ((fs - shield.size[0]) // 2, (fs - shield.size[1]) // 2))

    for size in (180, 32):
        out = ROOT / "public" / (
            "apple-touch-icon.png" if size == 180 else "favicon-32.png"
        )
        img = shield_sq.resize((size, size), Image.LANCZOS)
        if size == 180:  # iOS composites onto white; give it the brand field
            plate = Image.new("RGBA", (size, size), (43, 12, 22, 255))
            plate.alpha_composite(img)
            img = plate
        img.save(out, optimize=True)
        print(f"  wrote {out.name:<16} {out.stat().st_size / 1024:6.1f} KB")

    build_og_card(square)


def load_font(size, bold=False):
    """Best-effort system font. The OG card degrades to crest-only without one."""
    candidates = (
        ["seguisb.ttf", "arialbd.ttf", "calibrib.ttf", "georgiab.ttf"]
        if bold
        else ["segoeui.ttf", "arial.ttf", "georgia.ttf"]
    )
    for name in candidates:
        path = Path("C:/Windows/Fonts") / name
        if path.exists():
            try:
                return ImageFont.truetype(str(path), size)
            except OSError:
                continue
    return None


def build_og_card(square):
    """
    Open Graph card: crest on the left, institute name on the right.

    A logo-only card wastes the 1200x630 — this is the site's first impression
    when a link is shared, so it carries the full name too.
    """
    W, H = 1200, 630
    og = Image.new("RGBA", (W, H), (43, 12, 22, 255))

    # subtle vignette so the flat maroon doesn't read as a placeholder
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((-200, -260, 700, 700), fill=(107, 31, 53, 110))
    og.alpha_composite(glow.filter(ImageFilter.GaussianBlur(120)))

    crest_px = 380
    og.alpha_composite(square.resize((crest_px, crest_px), Image.LANCZOS), (78, (H - crest_px) // 2))

    draw = ImageDraw.Draw(og)
    f_mark = load_font(96, bold=True)
    f_name = load_font(35)
    f_tag = load_font(26)

    if not f_mark:
        print("  (no system font found — OG card is crest-only)")
    else:
        x = 78 + crest_px + 62
        draw.text((x, 176), "BAHIR", font=f_mark, fill=(255, 255, 255, 255))
        # Gold rule separating wordmark from name. Kept well clear of the
        # descender line — any closer and it reads as underlining "BA".
        draw.rectangle((x, 306, x + 96, 310), fill=(200, 164, 92, 255))
        for i, line in enumerate(
            ["Bangladesh Academy of", "Health Innovation & Research"]
        ):
            draw.text((x, 344 + i * 46), line, font=f_name, fill=(227, 185, 106, 255))
        if f_tag:
            draw.text((x, 452), "Physiotherapy education & research", font=f_tag,
                      fill=(203, 213, 225, 255))

    og_path = ROOT / "public" / "og-image.png"
    og.convert("RGB").save(og_path, optimize=True, quality=90)
    print(f"  wrote {og_path.name:<16} {og_path.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
