# AGENTS.md

Instructions for coding agents in this repository: the official themes of Micelio, published to `ghcr.io/bogd3v/micelio-themes`. It holds themes, not an application: there is no `package.json` and no `npm run check`.

## Engineering standard and the factory

The rules shared by every Micelio repository are in [`docs/engineering-standard.md`](https://github.com/bogd3v/micelio-engineering/blob/main/docs/engineering-standard.md) of `micelio-engineering`; this repository follows them (commits, DCO, agents: sections 11 and 13) and does not carry a copy yet. Work reaches `main` through the gates of [`docs/factory.md`](https://github.com/bogd3v/micelio-engineering/blob/main/docs/factory.md) there.

## The core is the tool

Everything that checks a theme is a script of the core, `bogd3v/micelio`, at the release pinned in `.github/workflows/` (`v0.5.4`). To work on a theme, check out that tag, set `MICELIO_THEME_DIRS` to this repository's `themes/` and run `npm run theme:check -- <id>`, `npm run theme:pack -- <id>` and `npm run theme:admit -- <step>`; the guide is `docs/themes/publishing-a-theme.md` (section 7, locally) and the `create-theme` skill of the core. Node and Docker are those of the core (`.nvmrc`, `AGENTS.md` there). Set `MICELIO_ADMISSION=true` as the admission workflows do, so that a theme of this repository wins over a core theme with the same id (from `v0.5.4`; the run prints `using <id> from <path>, not the core's`); two folders of `MICELIO_THEME_DIRS` with one id are still an error.

## Layout

- `themes/<id>/`: the theme folder, named after its `id`. Nothing outside it goes into the package.
- `__screenshots__/<id>/<mode>/<viewport>/<page>.png`: visual baselines. Never commit images rendered on a machine: render them with the core's `theme-snapshots.yml`, review them, commit them.
- `accessibility/<id>.json`: the manual record, from the checklist of the core. An agent may run it under a person's supervision; that person is named in `by` and answers for the record, and `method` names who ran which lines (the screen-reader lines are a person's). It is never copied from a run of another version.
- `.github/workflows/publish.yml`, `sign-index.yml`: copies of the core's templates (`docs/themes/registry-workflows/`). They hold the signing jobs whose paths are the pinned identities: never rename, move or run them from another branch than `main`; keep the `if: github.repository == 'bogd3v/micelio-themes'` guards. The one change from the template is `theme-dirs: themes/${{ inputs.theme }}`.
- `admission.yml`, `dco.yml`: CI for every pull request. `snapshots.yml` (by hand) renders the baselines with the core's `theme-snapshots.yml`.

## Rules

- A published version never changes: a fix is a new `version` in `theme.json`. A theme's `license` stays `AGPL-3.0-only`.
- Move to another core release by replacing `v0.5.4` and `core-ref` together in every workflow, and re-read the templates of that release.
- Third-party fonts and images keep their license text beside them and an entry in `THIRD-PARTY.md` and `REUSE.toml`.
- Never push, tag or run `Publish`/`Sign index` without the maintainer; never weaken a check (no skipped specs, no regenerated baselines).
