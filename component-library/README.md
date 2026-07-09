# DEIN ERSTER TAG – Komponenten-Bibliothek

Semantische CSS-Komponenten des Design-Systems, **Page-Builder-neutral** und **ohne Build-Schritt**.
Gedacht zum Einbinden in ein **bestehendes WordPress-Theme** und zum Zusammenbauen von Seiten in **Gutenberg oder WPBakery**.

## Was ist das (und was nicht)
- **Ist:** reine HTML+CSS-Bausteine mit semantischen Klassen (`.det-*`) + Design-Tokens als CSS-Variablen. Kein Tailwind, kein npm, kein Kompilieren.
- **Ist nicht:** ein Theme. Die Dateien werden in ein bestehendes Theme eingebunden.

Warum semantisch statt Tailwind-Utilities: In einem Page-Builder, in dem eine Redakteurin (Nils) Seiten per Drag-and-Drop zusammenstellt, sind Utility-Klassen-Ketten fehleranfällig (jede Markup-Änderung kann Styles zerreißen). Eine Klasse pro Komponente ist robust und editierbar.

## Dateien
| Datei | Zweck |
|---|---|
| `det-tokens.css` | Design-Tokens als CSS-Variablen (Farben, Typo, Radien, Abstände) |
| `det-components.css` | Komponenten-Klassen (referenzieren nur Tokens) |
| `det.js` | Optional – nur für interaktive Komponenten (FAQ, Mobile-Nav, Scroll-Reveal) |
| `index.html` | Lebender Style-Guide / Vorschau aller Komponenten |

## Einbinden ins Theme
CSS + JS im Theme registrieren (z.B. in `functions.php` des bestehenden Themes):

```php
add_action( 'wp_enqueue_scripts', function () {
    $dir = get_stylesheet_directory_uri() . '/det';
    wp_enqueue_style( 'det-tokens', "$dir/det-tokens.css", array(), '1.0.0' );
    wp_enqueue_style( 'det-components', "$dir/det-components.css", array( 'det-tokens' ), '1.0.0' );
    wp_enqueue_script( 'det', "$dir/det.js", array(), '1.0.0', true );
} );
```

Roboto muss geladen sein (falls das Theme es nicht schon tut):
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

## Verwendung im Page-Builder
Die HTML-Snippets sind für **beide** Builder dieselbe Grundlage – nur das Registrieren unterscheidet sich:

- **Gutenberg:** als **Block-Pattern** registrieren (`register_block_pattern`) oder in einen „Custom HTML"-Block einfügen. Editierbare Stellen später als Block-Attribute.
- **WPBakery:** als **Template** speichern oder in ein „Raw HTML"-Element einfügen; für wiederkehrende Bausteine ein eigenes Element mappen.

## Copy-Paste-Snippets (fertige Komponenten)

### Button (Primary / Outline / Disabled / Textlink)
```html
<a href="#" class="det-btn">Beratungsgespräch vereinbaren
  <svg class="det-btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
</a>
<a href="#" class="det-btn det-btn--outline">Zur Videostunde</a>
<span class="det-btn det-btn--disabled">Demnächst verfügbar</span>
<a href="#" class="det-link">Mehr erfahren
  <svg class="det-link__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
</a>
```

### Kopfblock (Overline + Heading + Lead)
```html
<div class="det-section-head">
  <p class="det-overline">ABSCHNITTSNAME</p>
  <h2 class="det-heading">Ihre Headline hier.</h2>
  <p class="det-lead">Optionaler Lead-Absatz.</p>
</div>
```

### Feature-Liste (Icon + Titel + Text, Trennlinien automatisch)
```html
<div class="det-feature-list">
  <div class="det-feature">
    <div class="det-icon-box"><!-- SVG w-6 --></div>
    <div>
      <h3 class="det-feature__title">Titel</h3>
      <p class="det-feature__text">Beschreibung…</p>
    </div>
  </div>
  <!-- weitere .det-feature … -->
</div>
```

### CTA-Karte (gelb)
```html
<section class="det-section det-section--light">
  <div class="det-container">
    <div class="det-cta">
      <div class="det-cta__inner">
        <h2 class="det-heading">Ihre CTA-Headline.</h2>
        <p>Kurzer Begleittext.</p>
        <a href="#" class="det-btn">Call to Action
          <svg class="det-btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

### FAQ-Akkordeon (braucht `det.js`)
```html
<div class="det-faq">
  <div class="det-faq__item">
    <button class="det-faq__trigger" aria-expanded="false">
      <span class="det-faq__question">Frage?</span>
      <svg class="det-faq__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
    </button>
    <div class="det-faq__answer"><div class="det-faq__inner"><p>Antwort…</p></div></div>
  </div>
  <!-- weitere .det-faq__item … -->
</div>
```

### Hero (hell, Bild + Copy)
Volle Sektion (bringt Hintergrund + Top-Padding für die fixe Nav selbst mit).
```html
<section class="det-hero">
  <div class="det-container">
    <div class="det-hero__row">
      <div class="det-hero__media"><img src="…" alt="…" /></div>
      <div class="det-hero__body">
        <h1 class="det-heading">Headline hier.</h1>
        <p class="det-lead">Lead-Text.</p>
        <a href="#" class="det-btn">CTA <svg class="det-btn__icon" …></svg></a>
        <div class="det-award"><div class="det-award__medal">🏆</div><p class="det-award__text">…</p></div>
      </div>
    </div>
    <div class="det-stat-bar">
      <div class="det-stat"><p><strong>Zahl</strong> <span class="det-stat__sub">Text</span></p></div>
      <!-- weitere .det-stat … -->
    </div>
  </div>
</section>
```

### Hero (dunkel, zentriert, für Sub-Seiten)
Optional mit `.det-hero__back` (Zurück-Link) und/oder `.det-hero__stage` (großes Bild/Video). Ohne Stage: reine Intro-Variante (z.B. Shop-Detailseiten).
```html
<section class="det-hero det-hero--dark">
  <div class="det-container">
    <a href="#" class="det-hero__back"><svg …><path d="M15 19l-7-7 7-7"/></svg> Zurück</a>
    <div class="det-hero__intro">
      <p class="det-overline">LABEL</p>
      <h1 class="det-heading">Headline hier.</h1>
      <p class="det-lead">Lead-Text.</p>
    </div>
    <div class="det-hero__stage">
      <img src="…" alt="…" />
      <button class="det-play-btn" aria-label="Video abspielen"><img src="ico-play.svg" alt="" /></button>
    </div>
  </div>
</section>
```

### Kontakt-Sektion
```html
<div class="det-contact">
  <div class="det-contact__media"><img src="…" alt="…" /></div>
  <div class="det-contact__body">
    <h2 class="det-heading">Wir beraten Sie gerne.</h2>
    <p class="det-body">Begleittext…</p>
    <div class="det-contact__person">
      <p>Name</p>
      <p>Rolle</p>
      <p><a href="mailto:…">mail@…</a></p>
    </div>
    <a href="#" class="det-btn">Beratungsgespräch vereinbaren <svg class="det-btn__icon" …></svg></a>
  </div>
</div>
```

### How it works (Schritte)
Jeder Schritt ist eine eigenständige Karte (bewusst anders als im ursprünglichen Prototyp mit getrennten Bild-/Text-Reihen — im Page-Builder lässt sich ein in sich geschlossener Baustein pro Schritt leichter ziehen und neu anordnen).
```html
<div class="det-steps">
  <div class="det-step">
    <div class="det-step__media"><img src="…" alt="…" /></div>
    <div class="det-step__num">1</div>
    <h3 class="det-feature__title">Titel</h3>
    <p class="det-feature__text">Text…</p>
  </div>
  <!-- weitere .det-step … Schritt 4 kann `det-step__media--dark` für das
       Screenshot-artige Handy-Bild auf dunklem Grund nutzen -->
</div>
```
**Wichtig bei `--dark`:** Grid-Kinder brauchen `min-width: 0` (bereits in `.det-step` gesetzt) — sonst kann ein hochformatiges Bild die Spalte sprengen (CSS-Grid-Standardverhalten `min-width: auto`).

### Produkt-Karte (Shop-Grid)
```html
<div class="det-product-card">
  <a href="#" class="det-product-card__media"><img src="…" alt="…" /></a>
  <h3 class="det-product-card__title">Produktname</h3>
  <p class="det-product-card__text">Beschreibung…</p>
  <div class="det-product-card__footer">
    <span class="det-badge">Auf Anfrage</span>
    <a href="#" class="det-link">Mehr erfahren <svg class="det-link__icon" …></svg></a>
  </div>
</div>
```

### Video-Karte (Videostunden-Grid)
```html
<div class="det-video-card">
  <div class="det-video-card__media">
    <img src="…" alt="…" />
    <a href="#" class="det-play-btn det-play-btn--sm" aria-label="Videostunde abspielen"><img src="ico-play.svg" alt="" /></a>
  </div>
  <div class="det-video-card__body">
    <p class="det-video-card__eyebrow">KATEGORIE</p>
    <h3 class="det-video-card__title">Titel</h3>
    <p class="det-body">Beschreibung…</p>
    <div class="det-video-card__tags"><span class="det-chip">Tag</span></div>
    <div class="det-video-card__footer"><a href="#" class="det-btn det-btn--outline">Zur Videostunde</a></div>
  </div>
</div>
```

### Video-Embed (Blue-Section, braucht `det.js`)
```html
<section class="det-video-embed">
  <div class="det-container">
    <div class="det-video-embed__intro">
      <h2 class="det-heading">Headline hier.</h2>
    </div>
    <div class="det-video-embed__stage">
      <div class="det-video-embed__thumb">
        <img src="…" alt="…" />
        <button class="det-play-btn" data-det-video-trigger data-embed-src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" aria-label="Video abspielen">
          <img src="ico-play.svg" alt="" />
        </button>
      </div>
      <iframe class="det-video-embed__iframe" title="…" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen hidden></iframe>
    </div>
  </div>
</section>
```
**Wichtig:** Das `<iframe>` darf **kein** `src`-Attribut haben (auch kein `src=""`) — leerer `src` lässt Chrome die aktuelle Seite rekursiv in sich selbst laden (Endlos-Reload, Seite wird blank/hängt sich auf). `det.js` setzt `src` erst beim Klick, aus `data-embed-src` auf dem Play-Button.

### Navigation (braucht `det.js`)
```html
<header class="det-nav">
  <div class="det-nav__bar det-container">
    <a href="/" class="det-nav__logo"><img src="logo.svg" alt="…" /></a>
    <nav class="det-nav__links">
      <a href="#" class="det-nav__link is-active">Menüpunkt</a>
      <a href="#" class="det-nav__link">Menüpunkt</a>
    </nav>
    <button class="det-nav__toggle" data-det-nav-toggle aria-label="Menü öffnen" aria-expanded="false">
      <svg …><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
  <div class="det-nav__mobile" data-det-mobile-menu>
    <div class="det-nav__mobile-inner">
      <a href="#" class="det-nav__mobile-link is-active">Menüpunkt</a>
    </div>
  </div>
</header>
```
`.det-nav` ist `position: fixed`. Die erste Sektion einer Seite braucht dadurch Abstand nach oben — Hero-Komponenten bringen das schon mit; sonst `.det-nav-offset` auf die erste Sektion setzen.

### Footer
```html
<footer class="det-footer">
  <div class="det-container">
    <div class="det-footer__top">
      <div class="det-footer__app">…</div>
      <div class="det-footer__contact">…</div>
      <div class="det-footer__social">…</div>
    </div>
    <div class="det-footer__links">
      <div><img class="det-footer__logo" src="logo.svg" alt="…" /></div>
      <div class="det-footer__col">…</div>
    </div>
    <div class="det-footer__bottom"><p>© 2026 …</p></div>
  </div>
</footer>
```

### Content-Formats-Carousel (braucht `det.js`)
Ab 1024px: gemeinsame Bild-Stage mit Crossfade + Auto-Advance (4s) + Progress-Bar, wie im Prototyp. Darunter/mobil: alle Formate als vertikale Karten mit eigenem Bild (bewusst vereinfacht gegenüber dem Original-Swipe-Carousel).
```html
<div class="det-carousel" data-det-carousel>
  <div class="det-carousel__stage">
    <img class="det-carousel__img" data-carousel-img="0" src="…" alt="…" />
    <!-- weitere .det-carousel__img mit data-carousel-img="1", "2" … -->
  </div>
  <div class="det-carousel__list">
    <button class="det-carousel__item" aria-pressed="false">
      <div class="det-carousel__item-media"><img src="…" alt="…" /></div>
      <div class="det-icon-box"><!-- SVG --></div>
      <div><h3 class="det-feature__title">Titel</h3><p class="det-feature__text">Text…</p></div>
      <div class="det-carousel__bar"><span class="det-carousel__bar-fill"></span></div>
    </button>
    <!-- weitere .det-carousel__item, Reihenfolge muss zu den data-carousel-img-Indizes passen -->
  </div>
</div>
```

Alle weiteren Komponenten und ihr Status: siehe [INVENTORY.md](INVENTORY.md).
Vollständige Vorschau: `index.html` im Browser öffnen.
