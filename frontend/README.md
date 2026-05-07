# AI Insurance Recommender - Frontend

The frontend is a React and TypeScript chat interface for the Turners-inspired car insurance recommendation flow.

## Getting Started

```bash
git clone https://github.com/Safdari10/ai-insurance-recommender.git
cd ai-insurance-recommender/frontend
pnpm install
pnpm run dev
```

Vite will print the local URL in the terminal. The default is usually `http://localhost:5173`.

The backend should also be running at `http://localhost:3001` so chat requests can reach the API.

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4 using `@tailwindcss/vite`
- Axios
- Font Awesome React icons
- Jest and React Testing Library
- ESLint

Tailwind CSS v4 is integrated through the Vite plugin, so this app does not require a `tailwind.config.js`, PostCSS config, or direct Autoprefixer setup for the current styling approach.

## Scripts

```bash
pnpm run dev      # Start the Vite dev server
pnpm run build    # Create a production build in dist/
pnpm run preview  # Preview the production build
pnpm run lint     # Run ESLint
pnpm test         # Run Jest in watch mode with coverage
```

For a one-off test run in CI-style workflows:

```bash
pnpm exec jest --coverage --runInBand
```
