# DEIN ERSTER TAG – B2B Design System
**File:** `index.html`  
**Project:** Studio2B / DET B2B Landing Page (Personaler*innen)  
**Figma source:** `https://www.figma.com/design/FpOmvQnqHAnsShUfiyuwOa/DET-Website-B2B?node-id=9703-2014`

---

## 1. Brand Colours

Alle Farben sind als Tailwind-Tokens in `shared/config.js` definiert — **keine Hex-Werte im Markup verwenden**.

| Token | Hex | Usage |
|---|---|---|
| `brand` / DET Blau | `#00afd6` | Primary CTA, links, active states, overlines, footer background; seit Juli 2026 auch Section-Background (Schulen-Suche, Pricing auf index.html) |
| `yellow` / DET Gelb | `#ffec5c` | CTA card backgrounds (yellow sections), award badge |
| `dark` / DET Schwarz | `#181818` | All body text, headings |
| `light` / DET Weiß | `#fafafa` | Page background, section backgrounds |
| `paper` | `#f4f4f2` | Alternating section backgrounds, cards (Shop-Intro, Video-Karten) |
| `mist` | `#f0f0f0` | Icon boxes, chips/tags, number badges |
| `line` | `#e3e3e3` | **Alle** Trennlinien & Rahmen (Dividers, tiles, FAQ, feature rows) |
| `muted` | `#a9a9a9` | Secondary/subdued text (stat text, list annotations) |
| `night` | `#002e38` | **Deprecated** — dunkle Hero-Backgrounds. Seit Juli 2026 durch die helle [Light Stage Hero](#5-section-patterns) (`bg-paper` + `text-slate`) ersetzt, nirgends mehr im Einsatz. Token bleibt für Sonderfälle erhalten |
| `slate` | `#384a53` | Breadcrumb-Nav Text (inaktiv/Trennzeichen); seit Juli 2026 auch Headline/Lead-Text der hellen Stage-Hero (siehe [Light Stage Hero](#5-section-patterns)) |
| `cloud` | `#f2f2f2` | Shop-Cross-Sell-Karte Hintergrund |
| `skylight` | `#f0f8fb` | Info-Banner Hintergrund (z.B. Lieferdatum-Hinweis) |
| `station-blue/-dark/-yellow/-orange` | `#33b9da` `#2c2d3e` `#f7cb28` `#f27c50` | Medienbox station icon boxes |
| White | `#ffffff` | Nav background, card backgrounds |
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

**Display-Skala (Tokens in `shared/config.js`):**

| Token | Größe | Line height | Letter spacing |
|---|---|---|---|
| `text-display` | 42px | 53px | −0.03em |
| `text-display-sm` | 34px | 1.15 | −0.03em |
| `text-display-xs` | 28px | 1.2 | −0.03em |

**Kanonische Headline-Kette (H1/H2):** `text-display-xs sm:text-display-sm lg:text-display`
Einzige Ausnahme — Hero neben Bild (Platzmangel bei `lg`): `text-display-xs sm:text-display-sm lg:text-[36px] xl:text-display`
Letter-Spacing steckt in den Tokens; für Overlines gibt es `tracking-tight2` (−0.03em). Keine festen `text-[42px]`-Werte mehr verwenden.

**Lead-Text:** `text-base lg:text-xl leading-[26px] lg:leading-[30px]`

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

### CTA Button (Primary)
```html
<a href="#kontakt" class="inline-flex items-center gap-2 bg-brand text-white
   px-6 py-3 rounded-full text-sm font-medium
   hover:bg-brand/90 active:scale-95 transition-all duration-200 w-fit group">
  Beratungsgespräch vereinbaren
  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" ...>
    <!-- chevron right -->
  </svg>
</a>
```
- **Einheitlich `px-6 py-3`** — es gibt keine px-4-Variante mehr
- **Immer `transition-all duration-200`**
- Background: `#00afd6` (brand), Shape: `rounded-full` (pill)
- Arrow icon slides right on hover (`group-hover:translate-x-1`), scale down on click

**Secondary (Outline):** `border-2 border-brand text-brand px-6 py-3 rounded-full text-sm font-medium hover:bg-brand hover:text-white transition-all duration-200`
**Disabled:** `span` mit `border-2 border-gray-300 text-dark/40 cursor-not-allowed`
**Textlink:** `inline-flex items-center gap-1 text-brand text-sm font-medium hover:gap-2 transition-all duration-200` + Chevron `w-4 h-4`
**Button + Textlink Combo:** Primary Button (ohne Chevron-Icon) direkt gefolgt von einem Textlink im selben `flex gap-6 items-center` Container — z.B. „Medienbox kostenlos bestellen" (Primary → Bestell-Anker) + „Mehr erfahren" (Textlink → Detailseite). Nutzt zwei unterschiedliche Ziele: Button = Aktion, Textlink = weiterführende Info.

### Overline Label
```html
<p class="text-brand text-base tracking-tight2 mb-4">SECTION LABEL</p>
```
- Always brand blue
- `16px`, uppercase in content, `tracking-tight2` (−0.03em)
- Sits above every major H2

### Icon Box
```html
<div class="w-12 h-12 bg-mist rounded-xl flex items-center justify-center shrink-0">
  <!-- Heroicons outline SVG, w-6 h-6 -->
</div>
```
- Größe `md` (Standard): `w-12 h-12` + `rounded-xl` + Icon `w-6 h-6`
- Größe `sm` (Mobile-Carousels, kompakte Listen): `w-10 h-10` + `rounded-lg` + Icon `w-5 h-5`
- Background: `bg-mist`; farbige Varianten (Medienbox-Stationen): `bg-station-*`
- Icon stroke colour `text-dark` (Shop-Detailseiten: `text-brand`)

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

### Breadcrumb Nav (Hauptnavigation, seit Juli 2026)
```html
<nav aria-label="Hauptnavigation" class="hidden lg:flex items-center gap-[23px]">
  <a href="https://www.deinerstertag.de/" target="_blank" rel="noopener" class="inline-flex items-center gap-[7px] text-slate hover:text-dark transition-colors duration-200">
    <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02Z" clip-rule="evenodd"/></svg>
    <span class="text-[14px] leading-[16px]">Schüler*innen</span>
  </a>
  <a href="lehrkraefte.html" class="inline-flex items-center gap-[7px] text-slate hover:text-dark transition-colors duration-200" aria-current="page">
    <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><!-- chevron --></svg>
    <span class="text-[14px] leading-[16px] font-bold">Lehrer*innen</span>
  </a>
  <!-- Personaler*innen, Shop analog -->
</nav>
```
- Ersetzt seit Juli 2026 (neues Figma-File `DET-Website-B2B`) die alte 3-Link-Nav auf **allen** Seiten
- Jedes Item: `heroicons-mini/chevron-right` (14px) + Label `text-[14px] leading-[16px]`, Farbe immer `text-slate` — nur die aktive Seite bekommt zusätzlich `font-bold` (keine Farbänderung) + `aria-current="page"`
- 4 Zielgruppen in fester Reihenfolge: **Schüler\*innen**, **Lehrer\*innen**, **Personaler\*innen**, **Shop**
- Schüler\*innen (seit Juli 2026, dieser Prototyp): keine eigene Seite im Prototyp → verlinkt extern auf `https://www.deinerstertag.de/` mit `target="_blank" rel="noopener"`, sonst identisches Link-Styling wie die anderen Items (kein disabled-State mehr)
- Mobile (`#mobile-menu`): unverändert einfache gestapelte Link-Liste (kein Chevron); Schüler*innen ebenfalls externer Link auf `https://www.deinerstertag.de/` (`target="_blank" rel="noopener"`) ganz oben
- Sobald eine Schüler*innen-Seite innerhalb des Prototyps existiert: `href` auf die lokale Seite umstellen und `target="_blank" rel="noopener"` entfernen — an allen 11 Seiten gleichzeitig ändern (Header ist nicht per Include/Partial geteilt, jede Seite trägt die Nav-Markup dupliziert)

### Award Badge
```html
<div class="flex gap-4 items-center">
  <div class="bg-yellow rounded-xl p-2.5 w-16 lg:w-20 flex items-center justify-center">
    <span class="text-3xl lg:text-4xl">🏆</span>
  </div>
  <p class="text-[13px] leading-relaxed"><strong>Ausgezeichnet</strong> vom BMBF ...</p>
</div>
```
**Seit Juli 2026 nirgends mehr im Einsatz** — war zuvor Teil der index.html-Hero, dort ersatzlos entfernt. Pattern bleibt als Referenz erhalten, falls es an anderer Stelle wieder gebraucht wird.

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

### Full-width tall image (School program, etc.)
- Height: `h-[240px] sm:h-[420px] lg:h-[655px–730px]`
- Always `rounded-2xl`, `overflow-hidden`, `object-cover`
- Parallax: `class="parallax-img"` — translateY on scroll via JS

### Light Stage Hero (Headline + großes Video/Bild — seit Juli 2026, ersetzt die dunkle Stage)
```html
<section class="bg-paper pt-24 lg:pt-32 pb-16 lg:pb-24">
  <div class="max-w-[1440px] mx-auto px-6 lg:px-8">
    <div class="max-w-[800px] mb-12 reveal">
      <p class="text-brand text-base tracking-tight2 mb-4">Overline</p> <!-- optional -->
      <h1 class="text-display-xs sm:text-display-sm lg:text-display text-slate font-normal mb-6">…</h1>
      <p class="text-base lg:text-xl leading-[26px] lg:leading-[30px] text-slate">…</p>
      <!-- optional CTA button hier -->
    </div>
    <div class="rounded-2xl overflow-hidden h-[240px] sm:h-[480px] lg:h-[730px] reveal-scale relative">
      <img class="w-full h-full object-cover" ... />
      <!-- optional Play-Button für Inline-Video -->
    </div>
  </div>
</section>
```
- Ersetzt seit Juli 2026 (Figma-File `DET-Website-B2B`, Node `Lehrkräfte/Videostunde Detail`) die dunkle `bg-night`-Stage als Standard für Hero+Video/Bild-Kombinationen — **`night` wird nicht mehr für neue Hero-Sections verwendet**
- Hintergrund `bg-paper`, Headline **und** Lead-Text in `text-slate` (nicht `text-dark` — bewusste Abweichung lt. Figma, softer als Standard-Body-Text)
- Kein extra `pt-8`/`pt-10`-Innenabstand mehr (war Artefakt der dunklen Vollbild-Stage) — normales Section-Padding `pt-24 lg:pt-32 pb-16 lg:pb-24`
- **Seit Juli 2026 nutzen die Shop-Detailseiten NICHT mehr die Light Stage Hero**, sondern die neue [Produkt-Bühne](#produkt-buehne-shop-detailseiten). Light Stage Hero bleibt aktuell nur auf `videostunde-detail.html` und `medienbox.html` im Einsatz.

### Produkt-Bühne (Shop-Detailseiten — seit Juli 2026, Figma `DET-Website-B2B` Node `Produkt/Detailseite`)
Zweispaltiges Hero für Produkt-Detailseiten (`shop-vr-box.html`, `shop-berufo.html`, `shop-jobterminal.html`, `shop-messe-set.html`, `shop-ar.html`) — ersetzt die frühere Light-Stage-Hero + „Zurück zum Shop"-Link.
- Section `bg-light pt-24 lg:pt-32 pb-16 lg:pb-24`; darüber Breadcrumb-Text `Shop / <Produkt>` (`text-[14px] text-slate`, „Shop" fett & verlinkt)
- Links: **Produkt-Slider** `bg-white rounded-2xl aspect-[696/608]` mit `.slider-track` (translateX), Prev/Next-Buttons (`w-10 h-10 rounded-full bg-white shadow-md`), Dots (`.slider-dots`, aktiv `bg-brand w-6`, inaktiv `bg-dark/20`). Logik als kleines Inline-`<script>` pro Seite (`[data-slider]`), NICHT in shared.js
- Rechts (`lg:w-[428px]`): H1 (`text-display-xs lg:text-[32px]`), Preiszeile (`text-brand text-xl` + `text-muted` Zusatz), Lead, **Häkchen-Box** (`bg-cloud rounded-2xl p-4`, 3 Check-Items), Primary-CTA → `#bestellen`
- Danach feste Sektionsabfolge: **PRODUKTINFORMATIONEN** (zentriert `max-w-[788px]`) → **DIE VORTEILE** (basiert auf [4 STATIONEN](#5-section-patterns): Intro + Video-Thumbnail mit Play-Button + Liste, runde Icons `bg-mist rounded-full`) → **BESTELLEN** (Formular auf `bg-paper`, aus medienbox übernommen) → **FAQ** → **KONTAKT** („Sie haben Fragen zu …?") → **CROSS-SELLING** (3 Produktkarten). Entfernt ggü. alt: FÜR WEN, CTA YELLOW, separate PREIS-Karte
- Produktbild VR-Box lokal: `assets/vr-box-produkt.png` (aus Figma exportiert)

### Yellow CTA Card (kanonisch — überall identisch)
```html
<section class="px-6 lg:px-8 pb-16 bg-light">
  <div class="max-w-[1440px] mx-auto">
    <div class="bg-yellow rounded-2xl py-20 lg:py-24 px-8 reveal-scale">
      <div class="max-w-[651px] mx-auto flex flex-col gap-6 items-center text-center">
        <h2 class="text-display-xs sm:text-display-sm lg:text-display text-dark">…</h2>
        <p class="text-[15px] leading-relaxed text-dark">…</p>
        <a class="…primary CTA…">…</a>
      </div>
    </div>
  </div>
</section>
```
Verwendet auf index (2×), lehrkraefte, shop, allen Shop-Detailseiten und medienbox (seit Juli 2026 die kanonische H2-Variante mit Info-Banner, direkt vor „Wir beraten Sie gerne.", ersetzt die frühere H3-Infokarte „Alles kostenlos für Ihre Schule"). Gleiche Struktur, nur Copy unterscheidet sich.
- Auf lehrkraefte.html und medienbox.html identische „Medienbox für ihre Schule bestellen."-Copy inkl. [Info-Banner-Variante](#5-section-patterns) (Lieferdatum) — auf lehrkraefte.html verlinkt der Button auf `medienbox.html#bestellen`, auf medienbox.html selbst lokal auf `#bestellen`

**Info-Banner-Variante (Lieferdatum-Hinweis):** Optionaler Baustein zwischen Fließtext und CTA-Button, `bg-skylight rounded px-4 py-2 w-fit`, Text `text-[15px] leading-relaxed text-dark` mit fettem Datum (`<strong class="font-bold">`). Auf lehrkraefte.html und medienbox.html (beide Medienbox-CTA), bei Bedarf auf weitere Yellow-CTA-Cards mit Liefer-/Verfügbarkeitsdatum übertragbar.

### Shop Product Cross-Sell Card
```html
<section class="bg-light py-16 lg:py-24 overflow-hidden">
  <div class="max-w-[1440px] mx-auto px-6 lg:px-8">
    <div class="bg-cloud rounded-2xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center p-6 lg:p-8 reveal-scale">
      <div class="w-full lg:w-[389px] shrink-0 rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[367px]">
        <img class="w-full h-full object-cover" ... />
      </div>
      <div class="flex flex-col gap-4 lg:gap-6 w-full lg:max-w-[550px]">
        <p class="text-brand text-base tracking-tight2">Shop</p>
        <h2 class="text-display-xs sm:text-display-sm font-normal text-dark">…</h2>
        <span class="bg-yellow text-dark rounded-full px-4 py-1.5 text-sm font-medium w-fit">ab 890 €</span>
        <p class="text-base lg:text-xl leading-[26px] lg:leading-[30px] text-dark">…</p>
        <div class="flex flex-wrap gap-6 items-center"><!-- primary CTA + Textlink, beide → Produkt-Detailseite --></div>
      </div>
    </div>
  </div>
</section>
```
- Bewirbt ein einzelnes Shop-Produkt im Kontext einer Zielgruppenseite (z.B. VR-Box auf lehrkraefte.html)
- Preis-Badge nutzt dieselbe Pill wie die Produktkarten auf shop.html (`bg-yellow text-dark rounded-full px-4 py-1.5 text-sm font-medium`) — zeigt den Startpreis des Produkts, z.B. „ab 890 €" (siehe shop-vr-box.html)
- Hintergrund `bg-cloud` (`#f2f2f2`) grenzt die Karte von den umgebenden `bg-light`-Sections ab
- Bild links (Desktop) / oben (Mobile), Copy rechts; beide CTAs (Button + Textlink) verlinken auf dieselbe Produkt-Detailseite

### Pricing Section (neu seit Juli 2026, bisher nur index.html)
```html
<section class="bg-brand py-16 lg:py-24">
  <div class="max-w-[1440px] mx-auto px-6 lg:px-8">
    <div class="max-w-[519px] mb-12 lg:mb-16 reveal">
      <p class="text-white text-base tracking-tight2 mb-4">Transparent und klar</p>
      <h2 class="text-display-xs sm:text-display-sm lg:text-display text-[#fafafa] font-normal">Unsere Preise</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-8 lg:p-10 reveal delay-100">
        <h3 class="text-xl leading-[30px] text-dark mb-3">…</h3>
        <p class="text-[15px] leading-relaxed text-dark/70">…</p>
      </div>
      <!-- weitere Preis-Karten analog -->
    </div>
  </div>
</section>
```
- Hintergrund `bg-brand` (blau), Überschrift-Farbtreatment identisch zur Schulen-Suche-Section (`text-white` Overline + `text-[#fafafa]` H2)
- Preis-Karten: `bg-white rounded-2xl p-8 lg:p-10`, 2-spaltiges Grid auf `md:`, sonst gestapelt
- Auf index.html: 2 Karten (Produktionskosten einmalig / Schulprogramm pro Jahr), erweiterbar auf mehr Karten falls nötig

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
- Clicking activates: swaps opacity, crossfades the tile (`transition-opacity duration-700`), restarts 4s timer
- Progress bar (`.medien-bar`): `width: 0→100%` over `4000ms linear` CSS transition
- Auto-advance every 4 seconds; starts only once the section scrolls into view (`IntersectionObserver`, threshold 0.3) so the progress bar doesn't run invisibly in the background
- Hover on a `.medien-item` → jumps to that tile (no auto-advance); mouse leave section → resumes auto-advance from current tile
- Mobile: replaced with snap-scroll swipe carousel (see §7)

**Seit Juli 2026 — echte Medien statt Bilder (index.html):** Die 4 Kacheln sind kein reines Bild-Crossfade mehr, jede hat einen eigenen Medientyp:
- **360° Rundgänge / #kurzerklärt**: `<video class="hls-video">` mit `data-hls-src` (Stream von `video.deinerstertag.de`, via `hls.js`) + `data-clip-start`/`data-clip-end` — spielt nur den definierten Ausschnitt in Endlosschleife
- **Augmented Reality**: `.phone-mockup` (reines CSS, kein Bild-Asset) mit lokalem `<video>` (`assets/AR_neu.mp4`), muted/loop
- **Sprachnachrichten mit Mini-Games**: Audio-Waveform-UI (`.waveform-bar`, animiert) + wortweises Text-Overlay (`.ov-word`, blendet synchron zur Clip-Position ein) + `.sound-toggle`-Button, der das `<audio>` (`assets/Sprachnachricht.mp3`) an-/stummschaltet
- Lazy Loading: `window.ensureMediaLoaded(media)` lädt HLS-Stream/Video/Audio erst, wenn die Kachel aktiv wird — nie mehrere Streams gleichzeitig im Hintergrund
- Nur die aktive Kachel spielt ab (`media.play()`), inaktive werden pausiert
- Benötigt `<script src="https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js"></script>` vor `shared.js` auf jeder Seite, die diese Section nutzt (aktuell nur index.html)
- CSS-Klassen (`phone-mockup`, `waveform-bar`, `sound-toggle`, `ov-word`) liegen in `shared/shared.css`
- Mobile Swipe-Carousel: Slides 0–2 (360°/#kurzerklärt/AR) bleiben statische Bilder aus `images-medien/`; Slide 3 (Sprachnachrichten) hat dieselbe Audio-Waveform-UI wie Desktop

### FAQ Accordion
- Technique: `grid-template-rows: 0fr → 1fr` (not max-height — avoids jump bug)
- Inner content: `opacity 0→1` + `translateY(-6px → 0)` delayed 50ms
- Only one item open at a time
- Active: question label + icon turn `#00afd6`
- Icon rotates 45° when open (+ becomes ×)

### Inline Video
- Shows thumbnail + `ico-play.svg` by default
- On click: thumbnail hides (`.hidden`), YouTube iframe becomes visible in same container
- `src` set on click with `?autoplay=1`
- Container stays same size (no modal, no scroll lock)
- YouTube embed: `https://www.youtube.com/embed/UreWfZDc9FM?si=9Det9V0G3NUSJgjY&autoplay=1`
- Aktuell auf `medienbox.html` (Hero) im Einsatz. Die frühere Blue-Section-Nutzung auf `index.html` ("Fachkräftemangel beginnt damit…") wurde seit Juli 2026 ersatzlos entfernt

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
- Breadcrumb-Nav hidden (`hidden lg:flex`), Hamburger button shown (`lg:hidden`)
- Slide-down drawer uses `max-height: 0 → 300px` transition
- Closes automatically on any nav link click
- Siehe [Breadcrumb Nav](#4-components) für Desktop-Pattern (4 Zielgruppen, Schüler*innen aktuell deaktiviert)

---

## 8. Assets & Files

| File | Purpose |
|---|---|
| `index.html` | Main landing page (no build step) |
| `shared/config.js` | **Zentrale Tailwind-Config (Design-Tokens)** — auf jeder Seite nach dem CDN-Script einbinden |
| `shared/shared.css` | Gemeinsame Styles (Reveal, FAQ, Nav, Forms, Modal) für alle Seiten |
| `shared/shared.js` | Gemeinsames JS (Reveal, FAQ, Nav, Parallax, Inline-Video, Swipe-Dots), defensiv — läuft auf jeder Seite; seitenspezifisches JS bleibt inline |
| `components.html` | Component Library — Single Source of Truth für kanonische Varianten |
| `sections.html` | Section map / naming reference |
| `design.md` | This file |
| `logo.svg` | Brand logo, 96×57px. Use `h-14 w-auto object-contain` in nav, `brightness-0 invert` in footer |
| `ico-play.svg` | Play button, 112×112px circle, brand blue fill, white triangle |
| `images-medien/360 Rundgang.png` | Content formats – 360° Rundgänge (nur Mobile-Swipe-Carousel, Desktop nutzt HLS-Video, siehe §6) |
| `images-medien/Augmented Reality.png` | Content formats – Augmented Reality (nur Mobile-Swipe-Carousel, Desktop nutzt `.phone-mockup` + Video) |
| `images-medien/kurzerklärt.png` | Content formats – #kurzerklärt (nur Mobile-Swipe-Carousel, Desktop nutzt HLS-Video, siehe §6) |
| `images-medien/sprachnachricht.png` | Unbenutzt seit Juli 2026 — sowohl Mobile als auch Desktop nutzen jetzt die Audio-Waveform-UI (`assets/Sprachnachricht.mp3`, siehe §6) |
| `assets/AR_neu.mp4` | Content formats – Augmented Reality, Video im `.phone-mockup` auf Desktop (index.html) |
| `assets/Sprachnachricht.mp3` | Content formats – Sprachnachrichten mit Mini-Games, Audio-Waveform-UI (index.html, Mobile + Desktop) |

External image assets (Figma CDN, expire after 7 days — replace with permanent hosting):
- Hero image, partner logos, classroom photo, testimonial portraits, step images, contact photo, footer app badges

External video streams (nicht lokal gehostet, siehe §6): 360°-Rundgang- und #kurzerklärt-Kacheln auf index.html laden HLS-Streams live von `video.deinerstertag.de`.

---

## 9. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| HTML | Statische Seiten | No build step, opens directly in browser |
| CSS | Tailwind CSS v3 via Play CDN | `cdn.tailwindcss.com` + `shared/config.js` (Tokens) + `shared/shared.css` |
| Font | Roboto via Google Fonts | `ital,wght@0,400;0,500;0,700;1,400` |
| JS | Vanilla | `shared/shared.js` (gemeinsam) + inline `<script>` nur für Seitenspezifisches (Medien-Tabs auf index, Video-Modal auf videostunde-detail) |
| Video (HLS) | `hls.js@1` via jsDelivr CDN | Nur index.html, für die HLS-Streams in der Content-Formats-Section (siehe §6) |
| Icons | Heroicons outline SVGs | Inline in HTML, `w-6 h-6`, `stroke-width="1.5"` |
| Server (dev) | `python3 -m http.server 8080` | Run from project root |

**Head-Boilerplate jeder Seite:**
```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
<script src="shared/config.js"></script>
<link rel="stylesheet" href="shared/shared.css" />
```
Vor `</body>`: `<script src="shared/shared.js"></script>` (+ ggf. seitenspezifisches Inline-Script).

---

## 10. Naming Conventions (shared vocabulary)

Use these names when referring to sections in conversation:

| # | Name | Headline / Key content |
|---|---|---|
| 1 | **NAV** | Logo + 4 Zielgruppen (Breadcrumb: Schüler\*innen · Lehrer\*innen · Personaler\*innen · Shop) + Hamburger |
| 2 | **HERO** | "Ihr nächster Azubi sitzt in einer Schulklasse. Wir bringen Sie dahin." + Stats-Bar (kein Award-Badge mehr, seit Juli 2026) |
| 3 | **SCHULEN-SUCHE** | "Diese Schulen in Ihrer Nähe arbeiten mit uns zusammen." – PLZ-Suche, seit Juli 2026 auf `bg-brand` (blau) |
| 4 | **CONTENT FORMATS** | "Berufe erleben – mit null Langeweile. So erreichen wir Ihre Zielgruppe." – 4 interaktive Medienformate |
| 5 | **CTA YELLOW 1** | "Wir begeistern Schüler\*innen. Lassen Sie sich von uns überzeugen." |
| 6 | **TESTIMONIALS** | Targobank + Penny quotes |
| 7 | **HOW IT WORKS** | "SO FUNKTIONIERT ES" – 4 steps |
| 8 | **SCHOOL PROGRAM** | "Unser Schulprogramm mit 8.500 Schulen. Und Sie sind dabei." |
| 9 | **CTA YELLOW 2** | "Tauchen Sie ein in die Welt von VR, Augmented Reality und zielgruppengerechten Videos." |
| 10 | **EMPLOYER BRANDING** | "Employer Branding like it's 2026" – 4 Benefit-Items (vorher "WAS SIE ZURÜCKBEKOMMEN") |
| 11 | **PRICING** | "Unsere Preise" – Produktionskosten + Schulprogramm-Kosten, seit Juli 2026 neu, auf `bg-brand` |
| 12 | **CONTACT** | "Wir beraten Sie gerne." – Robert Greve, CEO & Founder (vorher Henrick Figge) |
| 13 | **PARTNER LOGOS** | "Wir arbeiten für über 200 Unternehmen" |
| 14 | **FAQ** | "Noch unsicher? Hier sind die Fragen…" |
| 15 | **FOOTER** | Brand blue, social links, app badges, legal |

**Entfernt seit Juli 2026:** BLUE SECTION ("Fachkräftemangel beginnt damit…" + Inline-Video) — ersatzlos gestrichen, die blaue Hintergrundfarbe lebt jetzt in der SCHULEN-SUCHE-Section weiter.

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
- Don't hardcode Hex-Farben oder `text-[42px]`-Größen im Markup — Tokens aus `shared/config.js` verwenden (`line`, `paper`, `mist`, `muted`, `night`, `text-display*`)
- Don't duplicate CSS/JS in Seiten — gemeinsames gehört in `shared/shared.css` / `shared/shared.js`
- Don't build a second FAQ-, Button- oder CTA-Karten-Variante — kanonische Varianten stehen in `components.html`
