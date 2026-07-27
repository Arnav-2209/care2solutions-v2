# Contributing to Care2Solutions v2

## Team

| Developer   | GitHub                                           | Role        |
|-------------|--------------------------------------------------|-------------|
| Arnav       | [Arnav-2209](https://github.com/Arnav-2209)     | Owner       |
| Kinjal      | [Kinjal2207](https://github.com/Kinjal2207)     | Collaborator|

## Development Workflow

We use a **feature-branch workflow**. All development happens on feature branches, not directly on `main`.

```
main
  │
  ├── feature/homepage
  ├── feature/navbar
  ├── feature/services
  ├── feature/contact-form
  └── feature/contact-api
```

### Workflow Steps

```
GitHub Issue
     ↓
Feature Branch
     ↓
Development
     ↓
Pull Request
     ↓
Other developer reviews
     ↓
Merge into main
```

## Branch Naming

Use descriptive branch names that represent the **feature or task**, not the developer.

### Prefixes

| Prefix       | Purpose              | Example                    |
|--------------|----------------------|----------------------------|
| `feature/`   | New features         | `feature/homepage`         |
| `fix/`       | Bug fixes            | `fix/mobile-navbar`        |
| `refactor/`  | Code refactoring     | `refactor/backend-structure` |
| `docs/`      | Documentation        | `docs/setup-guide`         |

### Examples

```
feature/homepage
feature/navbar
feature/hero
feature/services
feature/contact-form
feature/contact-api
feature/footer
fix/mobile-navbar
fix/contact-validation
refactor/backend-structure
docs/development-setup
```

> **Do NOT** create permanent developer branches like `arnav` or `kinjal`. Branches represent features, not people.

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) style:

| Prefix      | Purpose                | Example                                |
|-------------|------------------------|----------------------------------------|
| `feat:`     | New feature            | `feat: create homepage hero`           |
| `fix:`      | Bug fix                | `fix: resolve mobile navigation issue` |
| `docs:`     | Documentation          | `docs: update development setup`       |
| `style:`    | Styling changes        | `style: improve service cards`         |
| `refactor:` | Code refactoring       | `refactor: simplify backend structure` |
| `test:`     | Tests                  | `test: add contact form tests`         |
| `chore:`    | Maintenance/tooling    | `chore: update dependencies`           |

## Daily Workflow

### Before Starting Any New Work

Always start from an updated `main`:

```bash
git switch main
git pull origin main
```

Then create your feature branch from the updated `main`:

```bash
git switch -c feature/<your-feature>
```

### Arnav's Workflow

```bash
# Start from updated main
git switch main
git pull origin main

# Create feature branch
git switch -c feature/homepage

# ... work on the feature ...

# Stage, commit, and push
git status
git add .
git commit -m "feat: build homepage"
git push -u origin feature/homepage
```

Then open a Pull Request: `feature/homepage → main`

**Kinjal2207 reviews the PR.** After approval, merge into `main`.

### Kinjal's Workflow

#### First-Time Setup

After accepting the GitHub collaborator invitation:

```bash
git clone git@github.com:Arnav-2209/care2solutions-v2.git
cd care2solutions-v2

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

#### Daily Development

```bash
# Start from updated main
git switch main
git pull origin main

# Create feature branch
git switch -c feature/contact-api

# ... work on the feature ...

# Stage, commit, and push
git status
git add .
git commit -m "feat: create contact API"
git push -u origin feature/contact-api
```

Then open a Pull Request: `feature/contact-api → main`

**Arnav-2209 reviews the PR.** After approval, merge into `main`.

## Keeping Branches Updated

### Before Creating a New Feature Branch

Always pull the latest `main` first:

```bash
git switch main
git pull origin main
git switch -c feature/<new-feature>
```

### If Your Feature Branch Becomes Outdated

If `main` has been updated while you're working on a feature branch, rebase your branch:

```bash
# From your feature branch
git fetch origin
git rebase origin/main
```

If there are conflicts during rebase:
1. Git will pause and show which files have conflicts
2. Open each conflicted file and resolve the conflicts
3. Stage the resolved files: `git add <file>`
4. Continue the rebase: `git rebase --continue`

Alternatively, you can merge main into your branch:

```bash
git fetch origin
git merge origin/main
```

> **Note:** Do not force push unless you understand the implications and have coordinated with the other developer.

## Merge Conflicts

If Git reports a merge conflict during a PR:

1. **Do NOT blindly resolve it** — review both sides of the conflict
2. Communicate with the other developer if both of you changed the same code
3. Understand what both changes intended to do
4. Resolve the conflict preserving both developers' intentions
5. Test after resolving

## Pull Request Guidelines

1. **One feature per PR** — Keep PRs focused
2. **Descriptive title** — Use the same convention as commits (e.g., `feat: add contact form`)
3. **Description** — Explain what changed and why
4. **Link Issues** — Reference the related GitHub Issue (e.g., `Closes #5`)
5. **Review required** — The other developer must review and approve before merging
6. **Test** — Make sure the build passes before requesting a review

## Security

This is a **healthcare services company** website. Be especially careful with:

- **Never commit** real patient information, PHI, passwords, API keys, tokens, or database credentials
- **Never commit** `.env` files with real values — use `.env.example` for templates
- Use **fake/test data** during development
- Do not add healthcare/security/compliance claims to the website unless explicitly provided and approved
- Do not log sensitive information

## GitHub Issues Workflow

We use GitHub Issues to organize and track work.

### Labels

| Label             | Purpose                       |
|-------------------|-------------------------------|
| `frontend`        | Frontend-related work         |
| `backend`         | Backend-related work          |
| `design`          | Design/UI tasks               |
| `feature`         | New feature                   |
| `bug`             | Bug report/fix                |
| `accessibility`   | Accessibility improvements    |
| `performance`     | Performance optimization      |
| `priority-high`   | High priority                 |
| `priority-medium` | Medium priority               |
| `priority-low`    | Low priority                  |

### Issue → Branch → PR Workflow

```
1. Create a GitHub Issue (e.g., "Homepage redesign")
2. Create a branch: feature/homepage
3. Develop the feature
4. Push and open a PR
5. Other developer reviews
6. Merge into main
7. Close the Issue
```
