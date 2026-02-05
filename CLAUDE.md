# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

octo-docty is a repository that uses **Beads (`bd`)** for issue tracking. Beads is an AI-native, git-synced issue tracker that stores issues in `.beads/` and syncs via a dedicated `beads-sync` branch.

## Beads Issue Tracking

All task tracking uses `bd` commands. Do not use TodoWrite, TaskCreate, or markdown files for tracking.

```bash
bd ready                          # Find available work (no blockers)
bd show <id>                      # View issue details
bd update <id> --status=in_progress  # Claim work
bd close <id>                     # Complete work
bd create --title="..." --type=task --priority=2  # Create issue
bd sync                           # Sync with git
```

Priority uses 0-4 (not high/medium/low): 0=critical, 2=medium, 4=backlog.

Do NOT use `bd edit` — it opens an interactive editor which blocks agents.

## Session Completion Protocol

When ending a work session, all steps are mandatory. Work is NOT complete until `git push` succeeds.

```bash
git pull --rebase
bd sync
git push
git status  # Must show "up to date with origin"
```

Before pushing: file issues for remaining work, run quality gates if code changed, close finished issues, and update in-progress items.

## Repository Structure

- `.beads/` — Beads config, database, and JSONL issue files (auto-synced by daemon)
- `.beads/config.yaml` — Beads configuration; sync branch is `beads-sync`
- `AGENTS.md` — Agent workflow instructions for Beads usage
