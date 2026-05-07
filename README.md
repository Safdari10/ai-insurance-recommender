# AI Insurance Recommender

AI Insurance Recommender is a full-stack car insurance assistant built around a Turners-inspired consultation flow. The app asks users for vehicle, driving history, and cover preference details, then uses Gemini to provide a tailored insurance recommendation.

## Overview

The project includes:

- A React, TypeScript, Vite, and Tailwind CSS v4 frontend
- A Node.js and Express backend
- Gemini-powered recommendation logic
- Docker Compose files for containerized local runs

## App Structure

```text
ai-insurance-recommender/
  backend/    # Express backend and Gemini chat service
  frontend/   # React/Vite frontend chat experience
  docker-compose.yml
  README.md
```

## Prerequisites

- Node.js
- pnpm via Corepack or a local pnpm install
- A Gemini API key for backend responses

## Installation

```bash
git clone https://github.com/Safdari10/ai-insurance-recommender.git
cd ai-insurance-recommender

cd backend
pnpm install

cd ../frontend
pnpm install
```

## Environment

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
HOST=localhost
```

`GEMINI_MODEL`, `PORT`, and `HOST` are optional. The backend defaults to `gemini-2.5-flash`, port `3001`, and `localhost`.

## Local Development

Start the backend:

```bash
cd backend
pnpm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
pnpm run dev
```

The frontend is served by Vite, usually at `http://localhost:5173`. The backend runs at `http://localhost:3001` unless configured otherwise.

## Verification

Frontend:

```bash
cd frontend
pnpm run lint
pnpm run build
pnpm exec jest --coverage --runInBand
```

Backend:

```bash
cd backend
pnpm run build
pnpm exec jest --coverage --runInBand
```

## Docker

```bash
docker-compose up --build
```

For service-specific details, see the README files in `backend` and `frontend`.
