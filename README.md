# Jewellery Backend

Node.js + TypeScript backend with layered architecture.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

## MongoDB

- Ensure MongoDB is running locally or use a hosted Mongo URI.
- Set `DATABASE_URL` in `.env` before starting the app.

## API Documentation

- Swagger UI: `http://localhost:5000/docs`
- Health endpoint returns docs URL: `GET /api/v1/health`

## Scripts

- `npm run dev` - start dev server with watch
- `npm run build` - compile to `dist`
- `npm run start` - run compiled server
- `npm run seed:admin` - create default admin user
- `npm run lint` - run eslint
- `npm run typecheck` - run TypeScript checks

## Folder Structure

- `src/config` - env and logging config
- `src/middleware` - express middlewares
- `src/routes` - API entry routes
- `src/modules` - domain modules with controller/service/repository/validation
- `src/utils` - reusable helpers and error classes
- `src/types` - type augmentations
