#!/usr/bin/env bash
# Tests of changed-themes.sh and of the shell and conditions of admission.yml that use its list. Run: bash scripts/ci/changed-themes.test.sh
# Needs git and jq. Every case runs in a throwaway repository; all cases run, and the exit code says whether any failed.
set -uo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
script="${repo}/scripts/ci/changed-themes.sh"
workflow="${repo}/.github/workflows/admission.yml"
all='["bogota","cartel","espora","gaceta"]'
passed=0
failed=0

export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
export GIT_AUTHOR_NAME=test GIT_AUTHOR_EMAIL=test@example.com GIT_COMMITTER_NAME=test GIT_COMMITTER_EMAIL=test@example.com

work="$(mktemp -d)" || exit 1
trap 'rm -rf "${work}"' EXIT

check() { # name expected got
  if [ "$2" = "$3" ]; then
    passed=$((passed + 1))
    echo "ok   $1"
  else
    failed=$((failed + 1))
    echo "FAIL $1: expected '$2', got '$3'"
  fi
}

# A repository with the four themes on main
fixture="${work}/repository"
git init -q -b main "${fixture}" && cd "${fixture}" || exit 1
for id in bogota cartel espora gaceta; do
  mkdir -p "themes/${id}" "__screenshots__/${id}"
  echo "{\"id\":\"${id}\"}" >"themes/${id}/theme.json"
  echo "${id}" >"themes/${id}/theme.css"
  echo "${id}" >"__screenshots__/${id}/home.png"
done
mkdir -p accessibility .github/workflows scripts/ci
for id in bogota cartel espora gaceta; do echo '{}' >"accessibility/${id}.json"; done
echo readme >README.md
echo readme >accessibility/README.md
echo 'name: Admission' >.github/workflows/admission.yml
if [ -f "${script}" ]; then cp -p "${script}" scripts/ci/; fi
git add -A && git commit -qm base || exit 1

branch() { git checkout -qf -B work main; }
commit() { git add -A && git commit -qm change; }
list() { "${script}" "$@" 2>/dev/null || echo "exit $?"; }

case_of() { # name expected command: the command changes a branch of main
  branch
  eval "$3"
  commit
  check "$1" "$2" "$(list main HEAD)"
}

case_of 'a theme file' '["gaceta"]' 'echo x >>themes/gaceta/theme.json'
case_of 'an accessibility record' '["espora"]' 'echo x >>accessibility/espora.json'
case_of 'the README' '[]' 'echo x >>README.md'
case_of 'a workflow' "${all}" 'echo x >>.github/workflows/admission.yml'
case_of 'a deleted workflow' "${all}" 'git rm -q .github/workflows/admission.yml'
case_of 'a baseline' '["cartel"]' 'echo x >>__screenshots__/cartel/home.png'
case_of 'the README of the records' '[]' 'echo x >>accessibility/README.md'
case_of 'two themes' '["bogota","gaceta"]' 'echo x >>themes/gaceta/theme.css; echo x >>accessibility/bogota.json'
case_of 'a deleted theme' '[]' 'git rm -qr themes/gaceta __screenshots__/gaceta accessibility/gaceta.json'
case_of 'a deleted theme beside a changed one' '["bogota"]' 'git rm -qr themes/gaceta; echo x >>themes/bogota/theme.css'
case_of 'a new theme' '["nueva"]' 'mkdir themes/nueva; echo "{}" >themes/nueva/theme.json'
case_of 'a file moved between themes' '["bogota","cartel"]' 'git mv themes/bogota/theme.css themes/cartel/moved.css'
case_of 'a file name outside ASCII' '["espora"]' 'echo x >"themes/espora/espora-ñ.css"'

branch
check 'no base' "${all}" "$(list)"
check 'an empty base' "${all}" "$(list '' HEAD)"
check 'a base git does not know' 'exit 128' "$(list 0000000000000000000000000000000000000000 HEAD)"

# main moved after the branch point: its changes are not the branch's
branch
echo x >>themes/gaceta/theme.css && commit
git checkout -q -B moved main && echo x >>themes/cartel/theme.css && commit
check 'a base ahead of the branch point' '["gaceta"]' "$(list moved work)"

# The checkout of a pull request: a merge commit whose first parent is the base branch
git checkout -q -B merge moved && git merge -q --no-ff -m merge work || exit 1

step() { # the script of the `run: |` step named $1 of admission.yml
  awk -v name="      - name: $1" '
    $0 == name { found = 1; next }
    found && /^      - name: / { exit }
    found && /^        run: \|$/ { body = 1; next }
    body && NF && !/^          / { exit }
    body { sub(/^          /, ""); print }
  ' "${workflow}"
}

selected() { # event: the list the `themes` job puts in its output, run as GitHub runs a step
  local script_of_step
  script_of_step="$(step 'List the themes to admit')"
  if [ -z "${script_of_step}" ]; then echo 'no such step'; return; fi
  : >"${work}/output"
  EVENT="$1" GITHUB_OUTPUT="${work}/output" bash -e -c "${script_of_step}" >/dev/null 2>&1 || { echo "exit $?"; return; }
  sed -n 's/^ids=//p' "${work}/output"
}

check 'the themes job on a pull request' '["gaceta"]' "$(selected pull_request)"
check 'the themes job by hand' "${all}" "$(selected workflow_dispatch)"

verdict() { # themes-result ids admission-result: the exit code of the `Admission` job
  THEMES="$1" IDS="$2" ADMISSION="$3" bash -e -c "$(step 'Every theme was admitted')" >/dev/null 2>&1
  echo "$?"
}

check 'Admission: every admission passed' 0 "$(verdict success '["gaceta"]' success)"
check 'Admission: nothing to admit' 0 "$(verdict success '[]' skipped)"
check 'Admission: a failed admission' 1 "$(verdict success '["gaceta"]' failure)"
check 'Admission: a cancelled admission' 1 "$(verdict success '["gaceta"]' cancelled)"
check 'Admission: a list whose admissions were skipped' 1 "$(verdict success '["gaceta"]' skipped)"
check 'Admission: a failed list' 1 "$(verdict failure '' skipped)"
check 'Admission: a cancelled list' 1 "$(verdict cancelled '' skipped)"
check 'Admission: a failed list that printed no theme' 1 "$(verdict failure '[]' skipped)"

holds() { # name line: admission.yml holds the line, whole
  if grep -qxF "$2" "${workflow}"; then check "$1" yes yes; else check "$1" yes no; fi
}

holds 'the matrix does not run for the empty list' "    if: needs.themes.outputs.ids != '[]'"
holds 'the matrix takes the list' "        theme: \${{ fromJSON(needs.themes.outputs.ids) }}"
holds 'one concurrency group per pull request' "  group: \${{ github.workflow }}-\${{ github.event.pull_request.number || github.run_id }}"
holds 'a new push cancels the run before it' '  cancel-in-progress: true'

echo "${passed} passed, ${failed} failed"
[ "${failed}" -eq 0 ]
