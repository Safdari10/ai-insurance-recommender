# AI Insurance Recommender - Backend

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running Tests](#running-tests)
3. [Building for Production](#building-for-production)
4. [Docker](#docker)
5. [Tech Stack](#tech-stack)
6. [License](#license)

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/Safdari10/ai-insurance-recommender.git
   ```

2. Navigate to the backend directory:

   ```sh
   cd ai-insurance-recommender/backend
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

4. Create a `.env` file in the backend directory and add the necessary environment variables:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-2.5-flash
   PORT=3001
   HOST=localhost
   ```

   `GEMINI_MODEL`, `PORT`, and `HOST` are optional. `GEMINI_API_KEY` is required.

5. Run the development server:

   ```sh
   pnpm run dev
   ```

6. The backend service should now be running on `http://localhost:3001`.

## Running Tests

To run the tests, use the following command:

```sh
pnpm test
```

The default test script runs Jest in watch mode. For a one-off run, use:

```sh
pnpm exec jest --coverage --runInBand
```

## Building for Production

To build the app for production, use the following command:

```sh
pnpm run build
```

This will generate the compiled JavaScript files in the `dist` directory.

## Docker

To run the backend service using Docker, follow these steps:

1. Build the Docker image:

   ```sh
   docker build -t ai-insurance-recommender-backend .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 3001:3001 --env-file .env ai-insurance-recommender-backend
   ```

The backend service should now be running on `http://localhost:3001`.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Gemini API**: AI recommendation responses
- **pnpm**: Fast, disk space efficient package manager
- **Docker**: Containerization platform

## License

No repository license file is currently included.
