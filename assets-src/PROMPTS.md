# Image generation prompts

16 images. Generate, save with the **exact filename** into the **exact folder**,
then run:

```bash
python scripts/optimise-images.py
```

The filename is what the site references (minus the extension), so a typo means
no image. Any of `.jpg` / `.png` / `.webp` works as the source.

---

## Read this first

**Append this style block to every prompt.** It is what makes 16 separately
generated images look like one commissioned shoot rather than a stock grab-bag:

> Editorial documentary photography, photorealistic, 35mm lens look, natural
> window light, shallow depth of field, calm professional mood, modern South
> Asian clinical/academic setting, Bangladeshi people, muted cool-clinical
> palette (soft teals and slate greys) with warm natural skin tones, subtle film
> grain, no text anywhere.

**And this avoid/negative list:**

> text, letters, words, numbers, signage, logos, watermarks, UI overlays,
> deformed hands, extra fingers, extra limbs, cartoon, 3D render, illustration,
> oversaturated colours, HDR halos, heavy vignette, plastic skin, stock-photo
> smiling at camera

Three reasons those matter:

1. **No text.** Generators mangle lettering, and any text would be baked in at
   one size and unreadable at another. Every label on the site is real HTML.
2. **South Asian setting.** This is a Dhaka academy. Generic Western-clinic
   imagery reads as fake immediately.
3. **Subject centred.** The optimiser **centre-crops** to each ratio. Put the
   subject in the middle third or it will be trimmed.

**Aspect ratio is not optional** — it's listed per image below. In Midjourney add
`--ar 16:9`; in most others just say "16:9 aspect ratio". Generate at the
**minimum width or larger**: the optimiser refuses to upscale and will silently
skip tiers on an undersized source.

**Faces:** prefer hands, technique, over-the-shoulder and mid-distance framing.
A single person smiling into the lens reads as stock and invites "who is that?".

---

## 1. Hero — `assets-src/hero/`

**16:9 · minimum 3200px wide** (the largest tier; your current hero is only
1376px, which is why it looks soft)

### `hero.jpg`

> Wide establishing shot of a modern physiotherapy teaching clinic in Dhaka,
> Bangladesh. Bright airy space with tall windows, treatment tables, exercise
> equipment and parallel bars. Two or three physiotherapy students in scrubs
> working with a therapist in the mid-distance, seen from behind and in profile,
> nobody facing the camera. Composition deliberately open and uncluttered on the
> LEFT THIRD so headline text can sit there. Cool daylight, sense of space and
> competence.

> **Why the left third:** the hero headline, institute name and buttons all sit
> on the left over a dark scrim. Busy detail there fights the text.

---

## 2. Course cards — `assets-src/courses/`

**16:10 · minimum 800px wide** (1600px recommended for retina)

### `musculoskeletal.jpg` — Musculoskeletal Physiotherapy Fundamentals

> Close-up of a physiotherapist's hands assessing a patient's shoulder joint,
> clinical treatment table, anatomical skeleton model softly out of focus behind.
> Hands and technique are the subject; no faces needed.

### `neurological.jpg` — Neurological Rehabilitation Techniques

> A stroke-rehabilitation session: patient walking between parallel bars with a
> therapist steadying them from behind, gait-training mirror to one side. Warm
> encouraging atmosphere, seen from a respectful mid-distance.

### `sports-injury.jpg` — Sports Injury Management & Recovery

> Sports physiotherapist strapping an athlete's knee with kinesiology tape on a
> treatment bench, athletic tape roll and foam roller nearby. Focus on the taping
> hands, athletic setting.

### `manual-therapy.jpg` — Advanced Manual Therapy Techniques

> Precise close-up of a therapist performing a spinal mobilisation on a patient
> lying prone on a treatment table. Hands and forearms in sharp focus, clean
> clinical linen, quiet concentration.

### `cardiopulmonary.jpg` — Cardiopulmonary Physical Therapy

> Cardiac-rehabilitation session: patient on a stationary exercise bike wearing a
> chest monitor strap, physiotherapist checking a clipboard beside them. Modern
> rehab gym, ECG monitor screen blurred in the background.

### `pediatric.jpg` — Pediatric Physiotherapy Essentials

> Paediatric physiotherapy room: therapist kneeling on a soft mat working with a
> young child on a large therapy ball, colourful but tasteful equipment. Warm and
> reassuring, child seen from behind or in soft profile — **no identifiable
> child's face**.

---

## 3. Facility cards — `assets-src/facilities/`

**16:9 · minimum 1200px wide**

> All three display at 16:9 now (I just aligned them — two were previously set to
> 4:3 and would have cropped your images a second time).

### `training.jpg` — "Hands-on Training" *(the wide card)*

> Practical teaching lab: a small group of physiotherapy students practising
> manual techniques on treatment tables while an instructor demonstrates. Busy
> but orderly, several tables receding into the frame, natural light.

### `research-lab.jpg` — "Research Labs"

> Biomechanics research laboratory: motion-capture cameras on tripods, force
> plate in the floor, reflective markers on a subject's leg, large monitor
> showing a gait waveform. Technical, clean, cool lighting.

### `community.jpg` — "Global Community"

> Diverse group of international physiotherapy postgraduates in a bright modern
> seminar room, mid-discussion around a table with laptops and notebooks. Mixed
> nationalities, collaborative energy, nobody posed for the camera.

---

## 4. News cards — `assets-src/news/`

**16:9 · minimum 800px wide**

### `spinal-study.jpg` — spinal rehabilitation research published

> Spinal rehabilitation research: anatomical lumbar spine model on a desk beside
> an open journal and a laptop showing a spine MRI scan. Editorial still-life,
> shallow depth of field, no readable text.

### `partnership.jpg` — World Physiotherapy certification partnership

> Two professional delegates shaking hands across a conference table in a modern
> meeting room, documents and water glasses on the table, mid-distance framing
> from the side. Formal but warm; **no flags, no logos, no signage**.

### `award.jpg` — Health Education Innovation Award 2026

> Understated award moment: a plain crystal/glass award trophy on a lectern in
> soft spotlight, blurred applauding audience behind. Elegant, no engraved text
> visible.

---

## 5. Event cards — `assets-src/events/`

**16:9 · minimum 800px wide**

> Note: event banners are **conditional** — a card only grows a banner once its
> image exists, so you can do these one at a time without the section looking
> half-finished.

### `summit.jpg` — International Physiotherapy Innovation Summit 2026

> Large conference auditorium during a keynote: full tiered seating seen from the
> rear, speaker small and distant on a lit stage, big blank projection screen.
> Sense of scale and occasion. **Screen must be blank or abstract — no text.**

### `dry-needling.jpg` — Advanced Dry Needling Workshop

> Intimate hands-on workshop: instructor demonstrating a fine-needle technique on
> a shoulder while four practitioners lean in to watch closely. Tight framing,
> sterile packaging and gloves visible, focused expressions in profile.

### `ai-webinar.jpg` — AI in Rehabilitation webinar

> Physiotherapist at a desk in a home-office setting joining a video call on a
> laptop, second monitor showing an abstract motion-analysis visualisation of a
> human figure. Evening lighting, screen glow. **Abstract graphics only — no
> readable interface text.**

---

## Faculty and testimonial portraits — do not generate

`assets-src/faculty/` stays **empty**, and so does the testimonial equivalent.

Those entries name real, specific people — Prof. Dr. Mohammad Rahman,
Dr. Ayesha Khan, Dr. Tanvir Islam, Prof. Sabrina Begum, and four named alumni.
Generating a face and publishing it under a real person's name fabricates that
person: visitors would reasonably believe they were looking at the actual dean.
That's a misrepresentation no styling can fix.

Your options, in order of preference:

1. **Real photographs** of those individuals, with their permission. Drop them in
   `assets-src/faculty/` as `rahman.jpg`, `khan.jpg`, `islam.jpg`, `begum.jpg`,
   then add `image: 'faculty/rahman'` to the matching entry in
   `src/data/faculty.js`.
2. **Leave them as initials.** `components/Avatar` already renders each person's
   initials on a brand gradient with a gold ring. That is a finished design, not
   a gap — plenty of institutions ship exactly this.
3. **Change the names to be illustrative** (e.g. "Faculty member, Musculoskeletal
   Sciences") if these are placeholder people rather than real staff. Then
   generated portraits become fine, because nobody specific is being depicted.
   Tell me if that's the case and I'll rework the data.

---

## After you add the files

```bash
python scripts/optimise-images.py
```

Then add the `image` line to each matching entry. I can do this pass for you once
the files are in — just say which ones landed.

| file you added | edit | line to add |
|---|---|---|
| `hero/hero.jpg` | *(none)* | script wires it automatically |
| `courses/musculoskeletal.jpg` | `src/data/courses.js` | `image: 'courses/musculoskeletal',` |
| `courses/neurological.jpg` | `src/data/courses.js` | `image: 'courses/neurological',` |
| `courses/sports-injury.jpg` | `src/data/courses.js` | `image: 'courses/sports-injury',` |
| `courses/manual-therapy.jpg` | `src/data/courses.js` | `image: 'courses/manual-therapy',` |
| `courses/cardiopulmonary.jpg` | `src/data/courses.js` | `image: 'courses/cardiopulmonary',` |
| `courses/pediatric.jpg` | `src/data/courses.js` | `image: 'courses/pediatric',` |
| `facilities/training.jpg` | `components/About/About.jsx` | `image: 'facilities/training',` |
| `facilities/research-lab.jpg` | `components/About/About.jsx` | `image: 'facilities/research-lab',` |
| `facilities/community.jpg` | `components/About/About.jsx` | `image: 'facilities/community',` |
| `news/spinal-study.jpg` | `src/data/news.js` | `image: 'news/spinal-study',` |
| `news/partnership.jpg` | `src/data/news.js` | `image: 'news/partnership',` |
| `news/award.jpg` | `src/data/news.js` | `image: 'news/award',` |
| `events/summit.jpg` | `src/data/events.js` | `image: 'events/summit',` |
| `events/dry-needling.jpg` | `src/data/events.js` | `image: 'events/dry-needling',` |
| `events/ai-webinar.jpg` | `src/data/events.js` | `image: 'events/ai-webinar',` |

`imageAlt` stays omitted (defaults to `''`, decorative) — every one of these sits
directly beside a heading that already names it. Only set it if an image conveys
something the text doesn't.

## Checklist

- [ ] Correct aspect ratio per image
- [ ] At or above the minimum width (hero especially — 3200px)
- [ ] Subject in the middle third (centre-crop)
- [ ] No text, logos or signage anywhere in frame
- [ ] Filenames exactly as listed, lowercase with hyphens
- [ ] `assets-src/faculty/` left empty unless you have real photographs
