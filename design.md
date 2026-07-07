# DEIN ERSTER TAG – B2B Design System
**File:** `index.html`  
**Project:** Studio2B / DET B2B Landing Page (Personaler*innen)  
**Figma source:** `https://www.figma.com/design/Oh9bCogEW9kMekH6zGWdWS/DET-B2B?node-id=40-927`

---

## 1. Brand Colours

| Token | Hex | Usage |
|---|---|---|
| `brand` / DET Blau | `#00afd6` | Primary CTA, links, active states, overlines, footer background |
| `yellow` / DET Gelb | `#ffec5c` | CTA card backgrounds (yellow sections), award badge |
| `dark` / DET Schwarz | `#181818` | All body text, headings |
| `light` / DET Weiß | `#fafafa` | Page background, section backgrounds |
| White | `#ffffff` | Nav background, card backgrounds |
| Grey text | `#a9a9a9` | Secondary/subdued stat text |
| Border grey | `#e3e3e3` / `#e2e2e2` | Dividers, tile borders, FAQ lines |
| Dark card | `#1b191a` | Step 4 image card background (app screenshot) |

---

## 2. Typography

**Font family:** Roboto (Google Fonts)  
Import: `family=Roboto:ital,wght@0,400;0,500;0,700;1,400`

| Style name | Size | Weight | Line height | Letter spacing | Used for |
|---|---|---|---|---|---|
| `b2b/text-xl` | 42px | 400 | 53px | −0.03em | H1, H2 section headings |
| `b2b/text-md` | 20px | 400 | 30px | 0 | Lead paragraph, stat bar text |
| `b2b/text-sm` | 15px | 400 | 1.69 | 0 | Body copy, feature descriptions, testimonials |
| `b2b/label` | 16px | 400 | 20px | −0.03em | Overlines (brand blue, uppercase) |
| `button label` | 13.33px | 500 | 16px | 0 | CTA button text |
| `footer label` | 14px | 400 | 18px | 0 | Footer links, copyright |

**Responsive type scale (Tailwind):**

| Breakpoint | H1/H2 | Lead text |
|---|---|---|
| Mobile `< sm` | 26–28px | 16px |
| `sm` 640px | 34–36px | 16px |
| `lg` 1024px | 36px | 18px |
| `xl` 1280px+ | 42px | 20px |

---

## 3. Spacing & Layout

**Max content width:** `1440px` (centered with `mx-auto`)  
**Horizontal padding:** `px-6` mobile → `px-8` desktop (`lg:px-8`)  
**Section vertical padding:** `py-16` mobile → `py-24` or `py-32` desktop

**Border radius scale:**
| Token | Value | Used for |
|---|---|---|
| `rounded-full` | 9999px | CTA buttons, avatar photos |
| `rounded-2xl` | 16px | Image containers, cards, CTA yellow sections |
| `rounded-xl` | 12px | Icon boxes, feature icons, app screenshots |
| `rounded-lg` | 8px | App store badges |

---

## 4. Components

### CTA Button
```html
<a href="#kontakt" class="inline-flex items-center gap-2 bg-brand text-white
   px-4 py-3 rounded-full text-sm font-medium
   hover:bg-brand/90 active:scale-95 transition-all duration-200 w-fit group">
  Beratungsgespräch vereinbaren
  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" ...>
    <!-- chevron right -->
  </svg>
</a>
```
- Background: `#00afd6` (brand)
- Text: white, `13.33px`, medium weight
- Shape: `rounded-full` (pill)
- Arrow icon slides right on hover (`group-hover:translate-x-1`)
- Scale down on click (`active:scale-95`)

### Overline Label
```html
<p class="text-brand text-base tracking-[-0.03em] mb-4">SECTION LABEL</p>
```
- Always brand blue
- `16px`, uppercase in content, `−0.03em` tracking
- Sits above every major H2

### Icon Box
```html
<div class="w-12 h-12 bg-gray-200/50 rounded-xl flex items-center justify-center shrink-0">
  <!-- Heroicons outline SVG, w-6 h-6 -->
</div>
```
- Size: `48×48px` (`w-12 h-12`)
- Background: `bg-gray-200/50` (semi-transparent grey)
- Corner radius: `rounded-xl` (12px)
- Icon: `24×24px`, stroke colour `text-dark`

### Stat Tile (Hero stats bar)
```html
<div class="border border-[#e3e3e3] flex items-center justify-center px-4 py-4 flex-1">
  <p><strong>8000+ Partnerschulen</strong><span class="text-[#a9a9a9]"> in ganz Deutschland</span></p>
</div>
```
- Three equal tiles in a row
- Left tile: `rounded-tl-2xl rounded-bl-2xl`
- Right tile: `rounded-tr-2xl rounded-br-2xl`
- Middle tile: `rounded-sm`
- On mobile: stacks vertically, top/bottom tiles get full rounding

### Award Badge
```html
<div class="flex gap-4 items-center">
  <div class="bg-yellow rounded-xl p-2.5 w-16 lg:w-20 flex items-center justify-center">
    <span class="text-3xl lg:text-4xl">🏆</span>
  </div>
  <p class="text-[13px] leading-relaxed"><strong>Ausgezeichnet</strong> vom BMBF ...</p>
</div>
```

---

## 5. Section Patterns

### Side-by-side layout (image + copy)
Used in: **Hero**, **Contact / Wir beraten**

```
Desktop:  [  IMAGE 55–795px  ] [gap 80–105px] [  COPY flex-1  ]
Mobile:   [  IMAGE 100% 4:3  ]
          [  COPY 100%       ]
```

- Image: `w-full lg:w-[55%] xl:w-[795px]` + `aspect-[4/3]` on mobile, fixed height on desktop
- Copy: `w-full lg:flex-1 lg:min-w-0`
- Gap: `gap-8 xl:gap-[105px]`
- Breakpoint: stacks at `< lg` (1024px)

### Full-width tall image (Blue section, School program)
- Height: `h-[240px] sm:h-[420px] lg:h-[655px–730px]`
- Always `rounded-2xl`, `overflow-hidden`, `object-cover`
- Parallax: `class="parallax-img"` — translateY on scroll via JS

### Yellow CTA Card
```
Centred content, max-w-[651px] mx-auto
Yellow background (#ffec5c), rounded-2xl, py-24 px-8
H2 42px → H2 responsive | body text 15px | CTA button
```
Used twice (sections 6 and 10). Identical structure, different copy.

### Feature row (icon + title + body)
```html
<div class="flex gap-4 items-start">
  <div class="icon-box shrink-0">…</div>
  <div>
    <h3 class="text-xl leading-[30px] mb-2">Title</h3>
    <p class="text-[15px] leading-relaxed text-dark/70">Body…</p>
  </div>
</div>
```
Stacked with `border-t border-[#eaeaea] pt-7` between items (School program section).

---

## 6. Interactive Behaviours

### Content Formats / Medien-Section (desktop)
- 4 buttons (`.medien-item`), each `data-medien="0–3"`
- Active = `opacity-100`, inactive = `opacity-50`
- Clicking activates: swaps opacity, crossfades image (`transition-opacity duration-700`), restarts 4s timer
- Progress bar (`.medien-bar`): `width: 0→100%` over `4000ms linear` CSS transition
- Auto-advance every 4 seconds via `setInterval`
- Hover on section → pause; mouse leave → resume
- Mobile: replaced with snap-scroll swipe carousel (see §7)

### FAQ Accordion
- Technique: `grid-template-rows: 0fr → 1fr` (not max-height — avoids jump bug)
- Inner content: `opacity 0→1` + `translateY(-6px → 0)` delayed 50ms
- Only one item open at a time
- Active: question label + icon turn `#00afd6`
- Icon rotates 45° when open (+ becomes ×)

### Inline Video (Blue section)
- Shows thumbnail + `ico-play.svg` by default
- On click: thumbnail hides (`.hidden`), YouTube iframe becomes visible in same container
- `src` set on click with `?autoplay=1`
- Container stays same size (no modal, no scroll lock)
- YouTube embed: `https://www.youtube.com/embed/UreWfZDc9FM?si=9Det9V0G3NUSJgjY&autoplay=1`

### Scroll Animations
All elements get one of these classes and are observed by `IntersectionObserver` (threshold 0.12):

| Class | Effect |
|---|---|
| `.reveal` | `opacity 0→1` + `translateY(40px→0)` |
| `.reveal-left` | `opacity 0→1` + `translateX(-50px→0)` |
| `.reveal-right` | `opacity 0→1` + `translateX(50px→0)` |
| `.reveal-scale` | `opacity 0→1` + `scale(0.92→1)` |

Stagger delays: `.delay-100` through `.delay-500` (CSS `transition-delay`).

### Parallax
`.parallax-img` elements receive `translateY` on window scroll:
```js
const offset = (centerY - window.innerHeight / 2) * 0.07;
img.style.transform = `translateY(${offset}px)`;
```

---

## 7. Responsive Breakpoints

**Strategy:** Mobile-first. Main layout flip at `lg` (1024px). Fine-tuning at `xl` (1280px).

| Breakpoint | Value | Purpose |
|---|---|---|
| `sm` | 640px | Stats bar switches from column to row; minor type adjustments |
| `lg` | 1024px | **Primary flip** — all side-by-side layouts switch to stacked |
| `xl` | 1280px | Hero image locks to fixed 795px; H1 reaches full 42px |

### Mobile-specific patterns
All use `swipe-track` class (hides scrollbar) + `snap-x snap-mandatory overflow-x-auto`:

| Section | Mobile pattern | Card width |
|---|---|---|
| Content Formats | Swipe carousel: image + text per card | `85vw` |
| How It Works | Swipe carousel: image + step per card | `85vw` |
| Testimonials | Swipe carousel: portrait + quote per card | `85vw` |

All swipe carousels have dot indicators below. Active dot = brand colour + `w-4` (wider). Dots sync via scroll event listener.

### Nav on mobile
- Links hidden (`hidden lg:flex`)
- Hamburger button shown (`lg:hidden`)
- Slide-down drawer uses `max-height: 0 → 300px` transition
- Closes automatically on any nav link click

---

## 8. Assets & Files

| File | Purpose |
|---|---|
| `index.html` | Main landing page (self-contained, no build step) |
| `sections.html` | Section map / naming reference |
| `design.md` | This file |
| `logo.svg` | Brand logo, 96×57px. Use `h-14 w-auto object-contain` in nav, `brightness-0 invert` in footer |
| `ico-play.svg` | Play button, 112×112px circle, brand blue fill, white triangle |
| `images-medien/360 Rundgang.png` | Content formats – 360° Rundgänge |
| `images-medien/Augmented Reality.png` | Content formats – Augmented Reality |
| `images-medien/kurzerklärt.png` | Content formats – #kurzerklärt |
| `images-medien/sprachnachricht.png` | Content formats – Mini games mit Sprachnachrichten |

External image assets (Figma CDN, expire after 7 days — replace with permanent hosting):
- Hero image, partner logos, classroom photo, testimonial portraits, step images, contact photo, footer app badges

---

## 9. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| HTML | Single `index.html` | No build step, opens directly in browser |
| CSS | Tailwind CSS v3 via Play CDN | `cdn.tailwindcss.com` |
| Font | Roboto via Google Fonts | `ital,wght@0,400;0,500;0,700;1,400` |
| JS | Vanilla, inline `<script>` | IntersectionObserver, scroll, FAQ, swipe dots, video, medien tabs |
| Icons | Heroicons outline SVGs | Inline in HTML, `w-6 h-6`, `stroke-width="1.5"` |
| Server (dev) | `python3 -m http.server 8080` | Run from project root |

---

## 10. Naming Conventions (shared vocabulary)

Use these names when referring to sections in conversation:

| # | Name | Headline / Key content |
|---|---|---|
| 1 | **NAV** | Logo + 3 links + hamburger |
| 2 | **HERO** | "Ihr nächster Azubi sitzt in einer Schulklasse." |
| 3 | **PARTNER LOGOS** | "Wir arbeiten für über 200 Unternehmen" |
| 4 | **BLUE SECTION** | "Fachkräftemangel beginnt damit…" + video |
| 5 | **CONTENT FORMATS** | "Sehen Sie, wie Ihr Beruf bei Schüler*innen ankommt." |
| 6 | **CTA YELLOW 1** | "Starten Sie jetzt. Das nächste Schuljahr wartet nicht." |
| 7 | **TESTIMONIALS** | Targobank + Vodafone quotes |
| 8 | **HOW IT WORKS** | "SO FUNKTIONIERT ES" – 4 steps |
| 9 | **SCHOOL PROGRAM** | "Unser Schulprogramm mit 8.000 Schulen." |
| 10 | **CTA YELLOW 2** | "Erfahren Sie welche Medienformate für Sie am besten geeignet sind." |
| 11 | **BENEFITS** | "WAS SIE ZURÜCKBEKOMMEN" – 4 items |
| 12 | **CONTACT** | "Wir beraten Sie gerne." – Henrick Figge |
| 13 | **FAQ** | "Noch unsicher? Hier sind die Fragen…" |
| 14 | **FOOTER** | Brand blue, social links, app badges, legal |

---

## 11. Key CSS Classes Reference

```
.reveal / .reveal-left / .reveal-right / .reveal-scale   Scroll fade-in animations
.parallax-img          Parallax translateY on scroll
.swipe-track           Hides scrollbar on horizontal scroll containers
.nav-bar               Backdrop blur for sticky nav
.medien-item           Interactive tab buttons (Content Formats, desktop)
.medien-img            Crossfading images (Content Formats, desktop)
.medien-bar            Progress bar inside each tab
.medien-dot            Dot indicator (Content Formats mobile carousel)
.steps-dot             Dot indicator (How It Works mobile carousel)
.faq-item              FAQ row wrapper
.faq-trigger           FAQ clickable button
.faq-answer            Grid-row collapsible container
.faq-answer-inner      Opacity + translate fade wrapper
.faq-icon              Rotates 45° when open
.float-anim            6s float keyframe animation (unused, available)
```

---

## 12. Do's & Don'ts

**Do:**
- Always use `object-cover` + `rounded-2xl` on section images
- Use `w-full lg:w-[fixed]` + `lg:shrink-0` for left-column images in side-by-side layouts — add `lg:w-auto` to the wrapper to release full-width on desktop
- Use `aspect-[4/3]` on mobile for any image that has a fixed height on desktop
- Keep the `swipe-track` class on all horizontal scroll containers (removes scrollbar on all browsers)
- Use `snap-start shrink-0 w-[85vw]` for swipe carousel cards

**Don't:**
- Don't use `max-height` animation for accordion — use `grid-template-rows` instead
- Don't set `w-full` on a flex-row child without also setting `lg:w-auto` — it will stretch and crush siblings
- Don't hardcode `whitespace-nowrap` on stat text — it breaks on mobile
- Don't use fixed pixel widths (`w-[795px]`) without a fluid fallback for intermediate viewports (`lg:w-[55%] xl:w-[795px]`)
