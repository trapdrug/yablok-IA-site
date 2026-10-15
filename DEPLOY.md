# Деплой — ПОДГОТОВЛЕНО, НЕ ЗАПУЩЕНО

Проект готов к деплою через ветку `main`, но сам деплой не выполнялся.

## Что уже настроено

- `main` — ветка для деплоя.
- `.github/workflows/pages.yml` — деплой frontend на GitHub Pages при push в `main`.
- `.github/workflows/ci.yml` — проверка на `main`: backend-тесты + сборка frontend (без деплоя).
- `render.yaml` + `Dockerfile` — заготовка для backend (Render / любой Docker-хостинг).
- Секреты НЕ в гите: `backend/.env` в `.gitignore`, в репо только `*.env.example`.

## Как включить деплой (вручную, когда будет нужно)

### Frontend (GitHub Pages)
1. GitHub → Settings → Pages → Source: **GitHub Actions**.
2. `git push origin main` — запустит `pages.yml`.
3. Важно: `frontend/src/api.ts` уже умеет работать без backend (mock-fallback),
   поэтому Pages-версия откроется даже без API.

### Backend (Render)
1. Render → New → Blueprint → указать репозиторий (подхватит `render.yaml`).
2. В Environment добавить секреты из `backend/.env.example`:
   `AI_FUNPAY_KEY`, `POLLINATIONS_API_KEY` и т.д.
3. После деплоя прописать URL backend в `VITE_API_URL` и пересобрать frontend.

Деплой сейчас НЕ запущен — это только подготовка.
