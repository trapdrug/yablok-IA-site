# Деплой

## Как ИИ работает «везде»
- **Основной путь — прямо из браузера.** `frontend/src/llm.ts` вызывает провайдера
  DungeonAPI (`https://31-76-100-137.sslip.io/v1`, модель `gpt-6-astra`) напрямую.
  Это работает на статичном хостинге без сервера, поэтому ИИ отвечает реальной моделью
  у любого посетителя (метка «● ответ нейросети»).
- **Если backend поднят** — сайт сначала спрашивает его (`/api/ai/ask`). Там тот же ключ
  используется через переменную `DUNGEON_API_KEY` (`backend/ai.py`).
- Если ни ключа, ни backend нет — офлайн-режим: точные ответы по правилам (`via: 'rules'`)
  и плашка «демо».

## ⚠️ Ключ в публичной сборке
- Ключ вшит в `frontend/src/llm.ts` (`DEFAULT_KEY`) и потому **виден любому**, кто откроет
  исходники страницы. Это осознанный выбор: так ИИ работает у всех без своего сервера.
  Ключ стоит периодически менять у провайдера.
- Чтобы убрать ключ из репозитория: добавьте Secrets репозитория
  (Settings → Secrets and variables → Actions → **Secrets**) `VITE_DUNGEON_KEY`,
  `VITE_DUNGEON_BASE_URL`, `VITE_DUNGEON_MODEL` и удалите значение из `llm.ts`.

## Что настроено
- `main` — ветка деплоя.
- `.github/workflows/pages.yml` — сборка и деплой frontend на GitHub Pages при push в `main`.
- `.github/workflows/ci.yml` — backend-тесты + сборка frontend.
- `render.yaml` + `Dockerfile` — заготовка для backend (Render / любой Docker-хостинг).
- Секреты НЕ в гите: `backend/.env` и `frontend/.env` в `.gitignore`, в репо только `*.env.example`.

## Frontend (GitHub Pages)
- Адрес: https://trapdrug.github.io/yablok-IA-site/
- `frontend/src/api.ts` умеет работать без backend (mock-fallback) — Pages-версия
  открывается даже без API, а ИИ отвечает нейросетью напрямую.

## Backend (опционально: Render / свой сервер)
1. Render → New → Blueprint → указать репозиторий (подхватит `render.yaml`).
2. В Environment добавить `DUNGEON_API_KEY` (купленный ключ). При желании —
   `POLLINATIONS_API_KEY`, `AI_FUNPAY_KEY`.
3. После деплоя прописать URL backend в `VITE_API_URL` и пересобрать frontend.

## Локальный запуск (живая база на всех своих устройствах)
- Самый простой способ: **двойной щелчок по `START-LAN.bat`** в корне репозитория.
  Скрипт при необходимости соберёт фронтенд, напечатает адреса и поднимет сервер.
  Бэкенд отдаёт и API, и сам сайт, поэтому устройствам в той же сети достаточно открыть
  `http://<IP ноутбука>:8000` — сразу живая база (бейдж «онлайн»), без демо.
- Адрес определяется автоматически: `frontend/src/api.ts` перебирает кандидатов
  (`VITE_API_URL` → origin страницы → `localhost:8000` → LAN-адрес) и берёт того,
  кто ответил на `/api/health`.
- Ручной запуск:
```
python -m uvicorn backend.app:app --port 8000 --host 0.0.0.0    # из корня репо
```
  Для разработки с горячей перезагрузкой: `cd frontend && npm run dev` → http://localhost:5173
- Требования: порт 8000 разрешён в брандмауэре Windows для `python.exe`
  (обычно окно «Разрешить доступ» всплывает при первом запуске).
- `backend/.env` — локальные секреты (в `.gitignore`), образец: `backend/.env.example`.
