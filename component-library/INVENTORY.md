# Komponenten-Inventar

Landkarte für die Integration ins bestehende Theme. Status:
**✅ fertig** (in `det-components.css` + Vorschau) · **🔜 nächste** (portierbar, noch nicht gebaut) · **⏸ zurückgestellt** (dynamisch, später).

Spalte „Im Theme?" ist für deinen Dev zum Ausfüllen: existiert das schon / muss angepasst werden / neu.

## Foundations
| Komponente | Klassen | Status | Quelle | Im Theme? |
|---|---|---|---|---|
| Design-Tokens | `:root { --det-* }` | ✅ | shared/config.js | |

## Atoms
| Komponente | Klassen | Status | Quelle | Im Theme? |
|---|---|---|---|---|
| Button Primary | `.det-btn` | ✅ | alle Seiten | |
| Button Outline | `.det-btn--outline` | ✅ | videostunden | |
| Button Disabled | `.det-btn--disabled` | ✅ | videostunden | |
| Textlink | `.det-link` | ✅ | shop | |
| Overline | `.det-overline` | ✅ | alle Seiten | |
| Heading (Display-Skala) | `.det-heading`, `--sm` | ✅ | alle Seiten | |
| Lead-Absatz | `.det-lead` | ✅ | alle Seiten | |
| Fließtext | `.det-body` | ✅ | alle Seiten | |
| Icon-Box (md/sm + Farben) | `.det-icon-box` | ✅ | alle Seiten | |
| Chip/Tag | `.det-chip` | ✅ | videostunden, medienbox | |
| Badge (gelb / NEU) | `.det-badge`, `--new` | ✅ | shop | |
| Award-Badge | `.det-award` | ✅ | index, lehrkraefte | |
| Stat-Tile | `.det-stat`, `.det-stat-bar` | ✅ | index, lehrkraefte | |
| Formularfeld | `.det-field`, `.det-field--select` | ✅ | medienbox | |

## Molecules
| Komponente | Klassen | Status | Quelle | Im Theme? |
|---|---|---|---|---|
| Kopfblock | `.det-section-head` | ✅ | alle Seiten | |
| Feature-Row/-Liste | `.det-feature`, `.det-feature-list` | ✅ | index, lehrkraefte, medienbox | |
| Testimonial | `.det-testimonial` | ✅ | index, lehrkraefte | |
| FAQ-Akkordeon | `.det-faq` (+ det.js) | ✅ | alle Seiten | |
| Produkt-Karte (Shop-Grid) | `.det-product-card` | ✅ | shop | |
| Video-Karte | `.det-video-card` (+ `.det-play-btn--sm`) | ✅ | videostunden | |
| Stat-Karte (Schulen-Finder) | `.det-stat-card` | ✅ | index | rein visuell, keine eigene JS-Logik — wird vom Tab-Bar-Klick oder der künftigen Such-Logik gesteuert |
| Tab-Bar | `.det-tabs` (+ det.js) | ✅ | index (Schulen), components | optionales Panel-Umschalten via `data-tab-target`/`data-tab-panel` |
| Pagination | `.det-pagination` | ✅ | index (Schulen) | reines Markup, keine JS-Logik (Seiten-Handling kommt mit der echten Suche) |
| Preis-Karte | `.det-price-card` | ✅ | shop-detail | |

## Organisms / Sektionen
| Komponente | Klassen | Status | Quelle | Im Theme? |
|---|---|---|---|---|
| Nav-Header + Mobile-Drawer | `.det-nav` (+ det.js) | ✅ | alle Seiten | |
| Footer | `.det-footer` | ✅ | alle Seiten | |
| Hero (Bild + Copy) | `.det-hero` | ✅ | index, lehrkraefte | |
| Hero (dunkel, zentriert) | `.det-hero--dark` (+ `.det-hero__back`, `.det-hero__stage`, `.det-play-btn`) | ✅ | medienbox, videostunde-detail, shop-detail | |
| Blue-Section (Inline-Video) | `.det-video-embed` (+ det.js) | ✅ | index, lehrkraefte | eigenständig, kein Hero — s. Iframe-Hinweis unten |
| Content-Formats (Carousel) | `.det-carousel` (+ det.js) | ✅ | index | Mobil vereinfacht: Karten statt Swipe, siehe README |
| How-it-works (Schritte) | `.det-steps` > `.det-step` | ✅ | index, videostunde-detail | Layout vereinfacht: 1 Karte/Schritt statt getrennter Bild-/Text-Reihen |
| Medienbox-Stationen | `.det-feature` (+ `__eyebrow`, `__tags`) + Icon-Farben | ✅ | medienbox | Erweiterung der bestehenden Feature-Row, keine neue Komponente |
| Kontakt-Sektion | `.det-contact` | ✅ | alle Seiten | |
| Partner-Logos | `.det-logos` | ✅ | index | |
| CTA-Karte (gelb) | `.det-cta` | ✅ | mehrere | |

## Zurückgestellt (dynamisch)
| Komponente | Status | Anmerkung |
|---|---|---|
| PLZ-Schulsuche | ⏸ | braucht Datenquelle + Endpoint; Markup später als statische Hülle. Bausteine dafür (Stat-Karte, Tab-Bar, Pagination) sind schon ✅ fertig |
| Medienbox-Bestellformular (Absenden) | ⏸ | Formular-Markup baubar; Verarbeitung über Plugin (CF7/Fluent) |

## Bekannte Vereinfachungen (bewusst, nicht 1:1 zum Original)
- **How-it-works:** jeder Schritt ist eine eigenständige Karte (Bild+Nummer+Text zusammen), statt getrennter Bild-Reihe/Text-Reihe auf Desktop wie im Original — im Page-Builder lässt sich ein einzelner, in sich geschlossener Baustein leichter ziehen und neu anordnen.
- **Content-Formats-Carousel:** Mobil (< 1024px) erscheinen alle Formate als vertikale Karten mit eigenem Bild statt des ursprünglichen Swipe-Carousels — vermeidet Touch-JS-Abhängigkeit pro Breakpoint. Ab 1024px identisches Verhalten zum Original (Crossfade + Auto-Advance + Progress-Bar).

## Bekannte Stolperfallen (wichtig für neue Komponenten)
- **CSS-Grid:** `.det-step` hat `min-width: 0`, weil Grid-Kinder sonst standardmäßig `min-width: auto` sind — ohne das kann ein hochformatiges Bild (z.B. das Handy-Bild in Schritt 4) seine Spalte sprengen. Gefunden, weil vier Spalten sichtbar ungleich breit waren; nach dem Fix per Bounding-Box bestätigt: alle vier exakt 222px.
- **Iframes ohne aktive Quelle (`.det-video-embed__iframe`):** Niemals `src=""` ins Markup schreiben (auch nicht als Platzhalter) — manche Browser interpretieren einen leeren `src` als Aufforderung, das aktuelle Dokument nachzuladen. Das `<iframe>` bekommt **kein** `src`-Attribut, `det.js` setzt es erst beim Klick aus `data-embed-src`. Mit `performance.getEntriesByType('navigation').length === 1` nach dem Klick verifiziert (kein Reload ausgelöst).

## Empfohlene Reihenfolge fürs Weiterbauen
1. ~~Sektions-Bausteine: Hero, Kontakt, How-it-works, Produkt-/Video-Karten~~ ✅ erledigt.
2. ~~Nav + Footer~~ ✅ erledigt.
3. ~~Content-Formats-Carousel~~ ✅ erledigt.
4. ~~Blue-Section (Inline-Video-Embed), Medienbox-Stationen, Partner-Logos, Stat-Karte/Tab-Bar/Pagination, Preis-Karte~~ ✅ erledigt.
5. Alles Statische ist jetzt gebaut. Übrig bleiben nur noch die zurückgestellten dynamischen Teile (⏸): PLZ-Schulsuche (Datenquelle klären) und das Bestellformular-Backend.
