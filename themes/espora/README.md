# Espora

The official theme of Micelio. Its colors come from the Micelio logo: a firm origin in ink (`bosque` on `espora`, inverted in the dark mode) and a living network in the accent (`musgo-hondo` in light, `liquen` in dark).

- **Modes:** `claro` (the default) and `oscuro`.
- **Layout:** `bar` header, `showcase` home, `grid` post list, `aside` article, `columns` footer.
- **Fonts:** Bricolage Grotesque for titles and Archivo for text; code uses the system monospace.
- **Slots:** `ThemeMark` (the Micelio symbol in one ink and the site name), `ThemeHero` (the network grown from its origin), `ThemeIllustration` (a small colony per category), `ThemeDivider` (a thread across the footer) and `ThemeProgressMarker` (a node on the reading bar). All are static.

`ThemeMark` draws the Micelio symbol. No trademark rights are granted with it: a site that is not Micelio replaces the slot with its own mark (see the trademark policy linked from `THIRD-PARTY.md`).

## Licenses

The theme's code, styles and messages are under the AGPL (`license` in `theme.json`: `AGPL-3.0-only`, the text in `LICENSE`). Some files keep another license, which this package carries with them:

| Files | License | Where the text is |
| --- | --- | --- |
| `fonts/bricolage-grotesque-latin-wght.woff2` (Bricolage Grotesque, The Bricolage Grotesque Project Authors) | OFL-1.1 | `fonts/OFL-BricolageGrotesque.txt` |
| `fonts/archivo-latin-var.woff2` (Archivo, The Archivo Project Authors) | OFL-1.1 | `fonts/OFL-Archivo.txt` |

The fonts are subsets of the original files, which the OFL allows because the licenses declare no Reserved Font Name.
