# Muze homepage prototype

Static HTML/CSS/JS prototype of the emerging Muze website direction.

## Current decisions represented here

- semantic, framework-free HTML
- body text at `1rem`
- sticky navigation with an opaque page background
- Muze wordmark shrinks subtly after scrolling
- light/dark mode, stored locally
- desktop layouts use the available width; secondary pages are grids rather than narrow prose columns
- mobile collapses to a normal document flow
- contextual links point at specific source pages/repositories/discussions where available; vague `source → GitHub` links are avoided
- Now remains explicitly AI-generated and provisional
- imagery is optional rather than structurally required

## Prototype caveats

- Images currently hotlink to Unsplash and should eventually be selected/hosted properly with attribution.
- People content is intentionally incomplete rather than invented.
- The Now provenance block demonstrates structure; it is not yet generated from live source collection.


## Current-site content migration

The prototype now includes the seven people currently listed on muze.nl, a fuller set of real Muze projects and experiments, and a factual About/contact page. The old UI/Development/Security service framing was deliberately not migrated because the new site direction supersedes it.


## The DS integration

### Vertical rhythm

The DS line height is the layout grid, not just a spacing token. On multi-column layouts, section headings reserve fixed line slots so optional metadata cannot push neighbouring columns out of alignment. Image heights are also quantized to whole multiples of `--ds-line-height` (for example 4-line thumbnails and 8-line Now images). On narrow single-column layouts those constraints may relax where cross-column alignment no longer matters.


This prototype now vendors the minimal `the-ds` CSS as `the-ds.css` and loads it before the site stylesheet. The site uses The DS as a foundation rather than adopting every component:

- cascade reset/layers and semantic base styles;
- design-system colour/type/spacing tokens, overridden for Muze's serif/red visual language;
- the `ds-sticky-top` primitive for the persistent header;
- The DS light/dark/auto theme classes, kept in sync with the existing theme switch.

The site deliberately does **not** use the DS dropdown component, default green/teal palette, or default Alegreya/Quicksand fonts. The Google Fonts import is removed from the vendored CSS because this site uses local/system font stacks and does not need the extra network request. Page-specific responsive/editorial composition remains in `styles.css`.

## CSS namespace convention

The DS is treated as a portable dependency. Its classes remain `ds-*` and are used directly in the HTML where they provide the required behavior. Site-specific classes are namespaced `muze-*`. Muze CSS should not duplicate a DS utility/component merely to hide it behind a Muze class. Multiple classes on an element are intentional.


## Spacing and vertical rhythm

The site uses The DS spacing model as the single source of truth for whitespace. `--ds-space` is tied to `--ds-line-height`; Muze-specific CSS uses only the DS spacing scale (`--ds-space-d4`, `--ds-space-d3`, `--ds-space-d2`, `--ds-space`, `--ds-space-x2`, `--ds-space-x3`, `--ds-space-x4`) for margins, padding and gaps. Display and heading line heights are also aligned to the DS line-height rhythm. Do not introduce independent Muze spacing tokens.


Search is intentionally omitted from v1: DuckDuckGo documents the `site:` operator but notes that advanced syntax is not reliable on all queries.


## Search

The navigation uses Brave Search for external site search. The first click on **Search** only reveals and focuses the input. A separate **Go** button, or Enter from the field, submits the query with `site:muze.nl` appended. This keeps the initial disclosure click from accidentally submitting.
