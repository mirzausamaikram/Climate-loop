# Climate Loop

Vertical energy coordination platform for Hong Kong high-rises. Climate Loop turns wasted thermal energy into 25–40% savings by coordinating cooling schedules across buildings.

**Status:** Local development (not deployed yet). Code is ready for Vercel (frontend) + Railway/Heroku (Python service) when you want to ship.

---

## Table of Contents
- Overview
- Why It Matters (HK-specific)
- Features
- Architecture
- Tech Stack
- API Surface
- Local Setup
- Scripts
- Project Structure
- Deployment (when ready)
- Portfolio Talking Points
- License

---

## Overview
Hong Kong buildings waste HK$4.2B annually because everyone cools at 7pm, causing peak loads and unfair thermal inequality (upper floors and south-facing units overpay). Climate Loop coordinates AC schedules, visualizes thermal flows, and shows real savings for residents and property managers.

### Why It Matters (HK-specific)
- Peak load spike at 7pm → 3x tariffs
- Stack effect: upper floors can waste ~60% more cooling
- Sun exposure: south-facing units pay ~40% more than north-facing
- Zero coordination today → everyone overpays

---

## Features
- **3D Thermal Visualization**: React Three Fiber building model with animated heat flow and gradients.
- **Live HK Data**: HK Observatory weather (simulated endpoint) + CLP Power time-of-use rates (modeled).
- **Savings Calculator**: Floor, orientation, and size inputs with HK$ monthly and yearly benefit projections.
- **API Demo Panel**: One-click tests of weather, electricity, and building metrics endpoints.
- **Scheduling Algorithm (Python)**: Greedy optimizer that assigns staggered cooling windows with credit incentives.
- **Business Impact Story**: Monetization (SaaS + transaction fees + carbon credits) and city-scale impact metrics.

---

## Architecture
- **Frontend**: Next.js 14 (App Router) + TypeScript, Tailwind, Framer Motion, React Three Fiber (Three.js).
- **APIs (Node/Edge)**: Next.js API routes for weather, electricity, and building metrics.
- **Python Microservice**: Flask wrapper around the scheduling optimizer; ready for Railway/Heroku.
- **Data flow**: Client UI → Next.js API routes → (optionally) Python service for optimized schedules.

---

## Tech Stack
- **UI**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber / Three.js, Lucide Icons
- **APIs**: Next.js API Routes
- **Backend (opt-in)**: Python 3 + Flask + Gunicorn
- **Testing**: pytest (Python), ESLint + TypeScript checks (frontend)

---

## API Surface
### Next.js API Routes
- `GET /api/weather` — HK Observatory-style payload (simulated, ready to swap to live API)
- `GET /api/electricity` — CLP-style time-of-use rates (peak/off-peak, modeled)
- `GET /api/buildings?buildingId=...` — Sample building energy metrics

### Python Service (Flask)
- `POST /api/schedule/optimize` — Full schedule optimization (apartments + weather + electricity)
- `POST /api/schedule/estimate` — Quick savings estimate (floor/orientation/size)
- `GET /health` — Health check

---

## Local Setup
Prereqs: Node 18+, Python 3.9+, npm, pip.

```bash
# 1) Install frontend deps
npm install

# 2) Install Python service deps
cd python
pip install -r requirements.txt
cd ..
```

### Run frontend
```bash
npm run dev
# http://localhost:3000
```

### Run Python backend (optional)
```bash
cd python
python api.py
# http://localhost:5000
```

### Tests
```bash
# Python tests
cd python
pytest test_scheduler.py -v
```

---

## Scripts (frontend)
- `npm run dev` — Start Next.js dev server
- `npm run lint` — ESLint
- `npm run build` — Production build
- `npm run start` — Start production build locally

---

## Project Structure (high level)
```
src/
	app/
		api/                  # Next.js API routes (weather, electricity, buildings)
		layout.tsx            # Root layout
		page.tsx              # Landing page composition
		globals.css           # Global styles
	components/             # UI sections and 3D visualization
	types/                  # Shared TypeScript types

python/
	scheduler.py            # Optimization core (greedy, thermal disadvantage scoring)
	api.py                  # Flask REST wrapper
	test_scheduler.py       # Unit tests
	requirements.txt        # Python deps
	Procfile                # Gunicorn entry (deploy)
```

---

## Deployment (when ready)
**Frontend (Vercel):**
- Connect the repo to Vercel and deploy `main`.
- Env vars: `NEXT_PUBLIC_APP_URL`, `PYTHON_API_URL` (if using Python service).

**Python service (Railway/Heroku):**
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn api:app`
- Expose `PORT` env var (Railway/Heroku provide it).

---

## Portfolio Talking Points
- Solves HK-specific vertical energy inequality (stack effect + sun exposure).
- Real-time coordination: 3D thermal viz + live HK data + savings calculator.
- Algorithm: Greedy scheduling with thermal disadvantage scoring and credit incentives.
- Business case: SaaS for property managers, transaction fees, carbon credits.

---

## License
MIT — built as a portfolio project.
