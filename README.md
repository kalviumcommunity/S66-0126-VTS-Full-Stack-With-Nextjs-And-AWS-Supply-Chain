# 🪬 ArtRoot — Where Ancient Art Finds New Homes

ArtRoot is a full-stack e-commerce platform that connects tribal and rural artisans directly with global collectors. Built with a modular, production-ready architecture featuring real-time authentication, per-user shopping carts, and a curated marketplace for handcrafted art.

## ✨ Key Features

- **Curated Marketplace** — Browse authentic handcrafted artworks from artisans across India, Africa, and South America
- **Authentication** — JWT-based sign-up/sign-in with bcrypt password hashing
- **Per-User Cart** — Each user gets their own persistent cart backed by PostgreSQL
- **Contact Form** — Working contact submission stored in the database
- **Dark Mode** — Full light/dark theme toggle
- **Responsive Design** — Mobile-first with sidebar navigation
- **Redis Caching** — Cached product and artist listings for performance
- **Docker Ready** — Full containerisation with docker-compose

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | **Next.js 16** (App Router), React 19, TypeScript |
| Styling | **Tailwind CSS v4**, custom earthy design system |
| API Layer | **Next.js API Routes** with Zod validation |
| Database | **PostgreSQL** with **Prisma** ORM |
| Caching | **Redis** (ioredis) |
| Auth | **JWT** + **bcryptjs** |
| Containerisation | **Docker** + **docker-compose** |
| CI/CD | **GitHub Actions** (lint → test → build) |
| Testing | **Vitest** + React Testing Library |
| Deployment | AWS / Azure ready |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── auth/           # /api/auth/login, /api/auth/register
│   │   ├── cart/           # /api/cart (GET, POST, PATCH, DELETE)
│   │   ├── products/       # /api/products (GET with filtering)
│   │   ├── artists/        # /api/artists (GET)
│   │   └── contact/        # /api/contact (POST)
│   ├── cart/               # Cart page with checkout
│   ├── layout.tsx          # Root layout with SEO & Sonner
│   ├── page.tsx            # Homepage
│   └── not-found.tsx       # Custom 404
├── components/             # UI components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ShopSection.tsx
│   ├── ArtistsSection.tsx
│   ├── ContactSection.tsx
│   ├── AuthModal.tsx
│   ├── AppSidebar.tsx
│   └── TopBar.tsx
├── contexts/               # React Context providers
│   └── AuthContext.tsx      # Auth + Cart state management
├── lib/                    # Server utilities
│   ├── prisma.ts           # Prisma client singleton
│   ├── redis.ts            # Redis client + cache helpers
│   ├── auth.ts             # JWT + bcrypt utilities
│   └── utils.ts            # cn() class merge utility
├── services/               # Business logic (extensible)
├── config/                 # App configuration
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── utils/                  # Frontend utilities
└── tests/                  # Vitest test suites
    ├── unit.test.ts
    └── api.test.ts
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed script for products, artists, demo user
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js ≥ 20
- PostgreSQL (local or cloud)
- Redis (local or cloud)

### 1. Clone & Install

```bash
git clone <YOUR_REPO_URL>
cd artroot-next
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database URL, Redis URL, and JWT secret
```

### 3. Set Up Database

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
# → http://localhost:3000
```

### Demo Account

After seeding, you can use:
- **Email:** `demo@artroot.co`
- **Password:** `demo123`

## 🐳 Docker Deployment

```bash
# Start all services (app, PostgreSQL, Redis)
docker-compose up --build

# Run migrations inside the container
docker exec -it artroot-next-app-1 npx prisma migrate deploy
docker exec -it artroot-next-app-1 npm run db:seed
```

## 🔌 API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user (name, email, password) |
| POST | `/api/auth/login` | Login (email, password) → JWT token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products?tag=Painting&page=1&limit=12` | List products with optional filter & pagination |

### Artists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/artists` | List all artists |

### Cart *(Auth Required)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current user's cart |
| POST | `/api/cart` | Add item (productId) |
| PATCH | `/api/cart` | Update quantity (cartItemId, quantity) |
| DELETE | `/api/cart?id=<cartItemId>` | Remove item |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form (name, email, subject, message) |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client (Browser)               │
│        Next.js React App (App Router)            │
│   ┌──────────┐ ┌────────┐ ┌──────────────────┐  │
│   │ HomePage │ │ Cart   │ │ AuthContext       │  │
│   │ Sections │ │ Page   │ │ (JWT + Cart State)│  │
│   └─────┬────┘ └───┬────┘ └────────┬─────────┘  │
└─────────┼──────────┼───────────────┼─────────────┘
          │          │               │
          ▼          ▼               ▼
┌─────────────────────────────────────────────────┐
│            Next.js API Routes (Server)           │
│   ┌────────┐ ┌──────┐ ┌──────┐ ┌───────────┐   │
│   │ /auth  │ │/cart │ │/prod.│ │ /contact  │   │
│   │register│ │ CRUD │ │ list │ │  submit   │   │
│   │ login  │ │      │ │      │ │           │   │
│   └───┬────┘ └──┬───┘ └──┬───┘ └─────┬─────┘   │
│       │         │        │            │          │
│   ┌───▼─────────▼────────▼────────────▼───┐     │
│   │         Prisma ORM Client              │     │
│   └───────────────┬───────────────────────┘     │
└───────────────────┼─────────────────────────────┘
                    │
          ┌─────────▼──────────┐
          │   PostgreSQL DB    │◄──── Docker Container
          │  (Users, Products, │
          │   Cart, Messages)  │
          └────────────────────┘
                    │
          ┌─────────▼──────────┐
          │     Redis Cache    │◄──── Docker Container
          │   (Products, List) │
          └────────────────────┘
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

**Test Coverage:**
- Unit tests for auth utilities (password hashing, JWT)
- Unit tests for utility functions (cn class merge)
- API integration tests for all endpoints

## 🔒 Security

- **HTTPS** enforced via HSTS headers
- **Secure headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Input validation**: All API inputs validated with Zod schemas
- **Password hashing**: bcrypt with 12 salt rounds
- **JWT authentication**: Secure token-based auth
- **No exposed secrets**: Environment variables via `.env` (gitignored)

## 📝 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):
1. **Lint** — ESLint check
2. **Test** — Vitest with PostgreSQL + Redis services
3. **Build** — Next.js production build

Triggers on push and pull requests to `main` and `deploy` branches.

## 🤔 Reflections

### Challenges Faced
- Migrating from Vite + React SPA to Next.js App Router required restructuring routing and state management
- Setting up Tailwind CSS v4 with custom HSL-based design tokens for seamless light/dark mode
- Implementing per-user cart with Prisma's upsert for atomic add-to-cart operations

### Key Takeaways
- Next.js API routes provide a clean full-stack architecture without needing a separate backend
- Prisma's type-safe ORM significantly reduces database-related bugs
- Redis caching dramatically improves response times for frequently-read data
- Docker Compose simplifies local development with multi-service dependencies

### Areas for Improvement
- Integrate a real payment gateway (Stripe / Razorpay)
- Add image uploads for artist profiles via S3/Blob storage
- Implement real-time order tracking
- Add admin dashboard for managing products and orders
- Implement rate limiting on auth endpoints

---

© 2026 ArtRoot. Crafted with ❤️ for artisans everywhere.
