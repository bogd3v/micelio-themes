# micelio-themes

The official themes of [Micelio](https://github.com/bogd3v/micelio), published to the registry at `ghcr.io/bogd3v/micelio-themes` (ADR 0008 of the core; bogd3v/micelio#313).

| Theme | What it is |
| --- | --- |
| [`bogota`](themes/bogota/README.md) | The theme of BogDev: two modes (`noche`, `dia`), a hero with slots, Archivo and JetBrains Mono |

A site installs a published theme with `npm run theme:add -- <id>[@range]` and `npm run theme:pull` in its Micelio checkout (`docs/operate/themes.md` of the core). The starter theme stays in the core.

## Layout

```
themes/<id>/                the theme folder: what the package holds
__screenshots__/<id>/       visual baselines, <mode>/<viewport>/<page>.png (outside the package)
accessibility/<id>.json     the manual accessibility record (outside the package; see accessibility/README.md)
.github/workflows/          admission.yml, snapshots.yml, publish.yml, sign-index.yml, dco.yml
```

## How a change reaches the registry

1. **Pull request.** `admission.yml` runs the core's `theme-admission.yml` on every pull request: `theme:check` and `theme:pack`, the performance budgets per site mode, visual regression and axe against the baselines. `dco.yml` checks `Signed-off-by` on every commit. `admission.yml` is pinned to one core release (`v0.5.5`, in `uses:` and `core-ref`, as are `snapshots.yml`, `publish.yml` and `sign-index.yml`); `dco.yml` to a commit of `micelio-engineering`.
2. **Version.** Raise `version` in `themes/<id>/theme.json` (semver; a published version never changes). A change to CSS, markup or slots also needs a new accessibility record.
3. **Publish.** A maintainer runs `Publish` (`publish.yml`, from `main`) with the theme id. It admits the theme again, pushes `ghcr.io/bogd3v/micelio-themes/<id>:<version>`, attests it and lists it in the signed index. `Sign index` (`sign-index.yml`) yanks a version, or lists one that a failed `Publish` run left pushed but unlisted. The signing identities are the paths of these two files on `main`, which the core pins: do not rename or move them. The steps are in [`publishing-a-theme.md`](https://github.com/bogd3v/micelio/blob/v0.5.5/docs/themes/publishing-a-theme.md), sections 8 to 11.

## Licence

AGPL-3.0-only (`LICENSE`), with the licenses of fonts and images in `THIRD-PARTY.md`. Contributions are signed off (DCO), as in the core: see the [contribution terms](https://github.com/bogd3v/micelio-engineering/blob/main/docs/contributing.md).
