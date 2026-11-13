# Cartel

A showcase theme of Micelio: every page is a two-ink poster, printed the way a risograph prints a gig flyer. It shares nothing with the look of `bogota` or `espora`, to show how far the same engine and the same content go.

- **Modes:** `papel` (the default: cream stock, a warm black key plate, vermilion and blue) and `tinta` (midnight stock, bone white, fluorescent pink and yellow). The fluorescent inks only exist in `tinta`: on a light paper they do not reach 4.5:1.
- **Layout:** `bar` header, `showcase` home, `grid` post list, `centered` article, `columns` footer.
- **Fonts:** Anton for titles and Atkinson Hyperlegible Next for text and interface; code uses the system monospace. Anton has one weight, so its face covers the whole weight range and no title is drawn with a synthetic bold. The titles of a page and of its sections are set in capitals; the titles of items keep their case.
- **The print:** hard offset shadows instead of blurred ones (a plate out of register), square corners, 2px rules in the key plate, halftones made with CSS gradients and SVG patterns, and a second plate printed out of register behind the largest titles (`overprint`, a primitive of the theme). The cover of a card is printed in one ink and shows its full color when the card is hovered or focused.
- **Slots:** `ThemeMark` (two inks out of register under a registration cross, and the site name), `ThemeHero` (a halftone sun, a disc of the second ink printed over it, the ground and the printer's marks), `ThemeIllustration` (two overlapping plates per category, the first in the category's color), `ThemeDivider` (the printer's control strip across the footer) and `ThemeProgressMarker` (a block of the first ink on the reading bar). All are static: no island, no JavaScript of the theme.
- **Focus:** every focus ring takes the `focus` role (the second ink), and `glow-link` is a hard ring of it, because the core gives comment fields no other focus indicator.
- **Motion:** the press coming down on cards and buttons, under `prefers-reduced-motion: no-preference`. Nothing else moves.

`ThemeMark` draws a generic registration mark, not a logo: a site replaces the slot with its own mark.

## Licenses

The theme's code, styles and messages are under the AGPL (`license` in `theme.json`: `AGPL-3.0-only`, the text in `LICENSE`). Some files keep another license, which this package carries with them:

| Files | License | Where the text is |
| --- | --- | --- |
| `fonts/anton-latin-400.woff2` (Anton, The Anton Project Authors) | OFL-1.1 | `fonts/OFL-Anton.txt` |
| `fonts/atkinson-hyperlegible-next-latin-wght.woff2` (Atkinson Hyperlegible Next, The Atkinson Hyperlegible Next Project Authors) | OFL-1.1 | `fonts/OFL-AtkinsonHyperlegibleNext.txt` |

The fonts are the latin subsets of the original files, as Fontsource distributes them (`@fontsource/anton` 5.3.0 and `@fontsource-variable/atkinson-hyperlegible-next` 5.3.0), which the OFL allows because the licenses declare no Reserved Font Name.
