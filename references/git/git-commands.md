# Git Commands Reference

Common Git commands used in daily development.

## Setup
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

## Repository
git init
git clone <repo-url>

## Status & History
git status
git log
git diff

## Staging & Committing
git add .
git commit -m "message"

## Branching
git branch
git branch <name>
git checkout <name>
git checkout -b <name>

## Remote
git remote -v
git push
git pull

## Mental Model
- Working directory → Staging → Commit → Remote
