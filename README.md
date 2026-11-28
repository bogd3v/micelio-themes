# micelio-themes

The official themes of [Micelio](https://github.com/bogd3v/micelio), published to the registry at `ghcr.io/bogd3v/micelio-themes` (ADR 0008 of the core; bogd3v/micelio#313).

| Theme | What it is |
| --- | --- |
| [`bogota`](themes/bogota/README.md) | The theme of BogDev: two modes (`noche`, `dia`), a hero with slots, Archivo and JetBrains Mono |
| [`espora`](themes/espora/README.md) | The official theme of Micelio: two modes (`claro`, `oscuro`), the colors of the Micelio logo, Bricolage Grotesque and Archivo |
| [`cartel`](themes/cartel/README.md) | A showcase theme: a two-ink poster in two modes (`papel`, `tinta`), halftones and plates out of register, Anton and Atkinson Hyperlegible Next |
| [`gaceta`](themes/gaceta/README.md) | A showcase theme: a broadsheet newspaper in three modes (`prensa`, `archivo`, `microfilm`), set in one serif with small capitals, rules and an aniline-violet stamp |

A site installs a published theme with `npm run theme:add -- <id>[@range]` and `npm run theme:pull` in its Micelio checkout (`docs/operate/themes.md` of the core). The starter theme stays in the core.

## Layout

```
themes/<id>/                the theme folder: what the package holds
__screenshots__/<id>/       visual baselines, <mode>/<viewport>/<page>.png (outside the package)
accessibility/<id>.json     the manual accessibility record (outside the package; see accessibility/README.md)
scripts/ci/                 changed-themes.sh, which lists the themes admission.yml admits, and its test
.github/workflows/          admission.yml, snapshots.yml, publish.yml, sign-index.yml, dco.yml
```

## How a change reaches the registry

1. **Pull request.** `admission.yml` runs the core's `theme-admission.yml` once per theme the pull request changes and from that theme's own folder, as `publish.yml` does: `theme:check` and `theme:pack`, the performance budgets per site mode, visual regression and axe against the baselines. `scripts/ci/changed-themes.sh` lists the themes: those with a changed file under `themes/<id>/` or `__screenshots__/<id>/`, or a changed `accessibility/<id>.json`; every theme when a file under `.github/workflows/` changes (the core pin lives there) and on a run by hand; otherwise none. A theme the pull request deletes is not listed. Its last job, `Admission`, passes only when every listed theme was admitted, or when none is listed: it is the one status that gives this workflow's verdict on every pull request, whatever themes it changes. A new push cancels the run before it of the same pull request. `dco.yml` checks `Signed-off-by` on every commit. `admission.yml` is pinned to one core commit (`1288a69` of core `main`, in `uses:` and `core-ref`, as are `snapshots.yml`, `publish.yml` and `sign-index.yml`; no core release renders the specimen groups that the release `0.10.0` admits (the `composition` group, the newsletter's consent line, the testimonials' source and rating), and `1288a69` carries the carbon exceptions of `cartel` and `espora`, so the pin moves to `v0.10.0` once it is tagged); `dco.yml` to a commit of `micelio-engineering`.
2. **Version.** Raise `version` in `themes/<id>/theme.json` (semver; a published version never changes). A change to CSS, markup or slots also needs a new accessibility record.
3. **Publish.** A maintainer runs `Publish` (`publish.yml`, from `main`) with the theme id. It admits the theme again, pushes `ghcr.io/bogd3v/micelio-themes/<id>:<version>`, attests it and lists it in the signed index. `Sign index` (`sign-index.yml`) yanks a version, marks one incompatible with a core (`incompatible`, from v0.6.0), or lists one that a failed `Publish` run left pushed but unlisted. The signing identities are the paths of these two files on `main`, which the core pins: do not rename or move them. The steps are in [`publishing-a-theme.md`](https://github.com/bogd3v/micelio/blob/1288a692161351f3c439e4965d5ad846c152ca8d/docs/themes/publishing-a-theme.md), sections 8 to 12.

## Licence

AGPL-3.0-only (`LICENSE`), with the licenses of fonts and images in `THIRD-PARTY.md`. Contributions are signed off (DCO), as in the core: see the [contribution terms](https://github.com/bogd3v/micelio-engineering/blob/main/docs/contributing.md).
