#!/usr/bin/env bash
# Prints, as a JSON list, the ids of the themes admission.yml admits. Run it from the root of the repository.
#
#   changed-themes.sh [<base> [<head>]]      head defaults to HEAD
#
# The ids are those of <head> (a folder of themes/ with a theme.json) that the changes of <base>...<head> name: a file under
# themes/<id>/ or __screenshots__/<id>/, or accessibility/<id>.json. Every id when a file under .github/workflows/ changed (the
# core pin lives there) or when <base> is absent or empty. Anything git cannot answer is an error, never the empty list.
set -euo pipefail
export LC_ALL=C

base="${1-}"
head="${2-HEAD}"

ids="$(git ls-tree -r --name-only "${head}" -- themes | sed -n 's|^themes/\([^/]*\)/theme\.json$|\1|p' | sort)"
if [ -z "${ids}" ]; then echo "::error::no theme found in themes/" >&2; exit 1; fi

if [ -n "${base}" ]; then
  # --no-renames: a file moved from one theme to another changes both
  changed="$(git diff --name-only --no-renames -z "${base}...${head}" -- | tr '\0' '\n')"
  if ! grep -q '^\.github/workflows/' <<<"${changed}"; then
    named="$(sed -n \
      -e 's|^themes/\([^/]*\)/.*|\1|p' \
      -e 's|^__screenshots__/\([^/]*\)/.*|\1|p' \
      -e 's|^accessibility/\([^/]*\)\.json$|\1|p' <<<"${changed}")"
    # Only the themes of <head>: a deleted one is not admitted. Status 1 of grep is "none of them"
    ids="$(grep -Fx -f <(printf '%s\n' "${named}") <<<"${ids}" || [ "$?" -eq 1 ])"
  fi
fi

jq -Rsc 'split("\n") | map(select(. != ""))' <<<"${ids}"
