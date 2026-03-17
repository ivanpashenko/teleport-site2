# Teleport site2

Static site for GitHub Pages.

## Local run

Use any static server from `site2/`:

```bash
python3 -m http.server 8000
```

Open:

- `http://localhost:8000/`
- `http://localhost:8000/formats.html`

## Deploy to GitHub Pages

This project is plain static HTML + JS + YAML.

Recommended:
- push `site2` as the repository root for the Pages repo
- in GitHub repo settings open Pages
- set source to `Deploy from a branch`
- branch: `main`
- folder: `/ (root)`

## Ignored

Not committed to git:
- `chats/`
- `gen/`
