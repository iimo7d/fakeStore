# FakeStore

A small e-commerce front end built with **Angular 22**, powered by the public [FakeStore API](https://fakestoreapi.com/).
Browse products, register/sign in, manage a cart, and view your profile with a map.

## Features

- **Products** – catalog fetched from FakeStore API
- **Auth** – login & register, token stored client-side, route protection via `authGuard`
- **Cart** – add/remove items (NgRx state)
- **Profile** – user details with an interactive [Leaflet](https://leafletjs.com/) / OpenStreetMap map
- Lazy-loaded routes, toast notifications, Lucide icons

## Tech stack

| Area | Tools |
|------|-------|
| Framework | Angular 22 (standalone components, lazy routes) |
| State | NgRx Store + Effects (feature stores per page) |
| Styling | Tailwind CSS 4 |
| Maps / icons / toasts | Leaflet, lucide-angular, @ngxpert/hot-toast |
| Tests | Vitest + jsdom |

## Getting started

```bash
npm install
npm start          # http://localhost:4200
```

| Script | Purpose |
|--------|---------|
| `npm start` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run watch` | Dev build in watch mode |
| `npm test` | Run unit tests |

## Project structure

```
src/app/
├── core/       header, footer, product-card, auth guard
├── shared/     button, form-errors, auth API, storage, auth store
└── pages/
    ├── product/   list + service + NgRx store
    ├── cart/      cart page + NgRx store
    ├── profile/   profile page, map, service, store
    ├── login/
    ├── register/
    └── main-layout.ts
```

Each page keeps its own `store/` (actions, effects, feature), `services/`, and `types/`.

## Routes

| Path | Page | Guarded |
|------|------|---------|
| `/login`, `/register` | Auth forms | No |
| `/product` (default) | Product list | No |
| `/cart` | Cart | Yes |
| `/profile` | Profile | Yes |

## API

Base URL is configured in `src/app/app.config.ts` (`https://fakestoreapi.com/`).
