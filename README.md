# Desi.P9X9 - Next.js Version

A modern, SEO-optimized video streaming platform built with Next.js 14, React 18, TypeScript, and MongoDB.

## Features

- **Server-Side Rendering (SSR)** for optimal SEO
- **Dynamic Sitemap Generation** (`/sitemap.xml`)
- **Robots.txt** generation
- **Open Graph & Twitter Cards** for social sharing
- **Dark/Light Theme** with persistence
- **Responsive Design** with mobile-first approach
- **MongoDB Integration** with Mongoose
- **Infinite Scroll** for suggested videos
- **Video Player** with custom controls
- **Search Functionality** with text indexing

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- MongoDB + Mongoose
- Tailwind-like CSS Variables (no Tailwind dependency)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
```bash
cd D:\desi.p9x9.new
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your MongoDB URI.

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── count/           # Count API (GET/POST)
│   │   ├── force-download/  # Video download proxy
│   │   ├── suggested/       # Suggested videos API
│   │   └── webs-p9x9-data/  # Webhook for adding videos
│   ├── movie/[id]/          # Movie detail page (SSR)
│   ├── l/                   # All videos listing
│   ├── sitemap.xml/         # Dynamic sitemap
│   ├── robots.ts            # Robots.txt
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (SSR)
│   └── globals.css          # Global styles with CSS variables
├── components/
│   ├── ThemeProvider.tsx    # Theme context
│   ├── Navbar.tsx           # Navigation bar
│   ├── Header.tsx           # Header with CTA buttons
│   ├── MovieCard.tsx        # Movie grid card
│   ├── VideoPlayer.tsx      # Custom video player
│   ├── SuggestedCard.tsx    # Suggested video card
│   ├── LoadMore.tsx         # Load more button
│   └── Ads.tsx              # Ad scripts
├── lib/
│   ├── mongodb.ts           # MongoDB connection
│   ├── site-config.ts       # Site configuration
│   └── count.ts             # Count utilities
└── models/
    ├── Movie.ts             # Movie schema
    └── Count.ts             # Count schema
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/webs-p9x9-data` | List/Search movies |
| POST | `/api/webs-p9x9-data` | Add/Update movie (webhook) |
| GET | `/api/count` | Get count data |
| POST | `/api/count` | Update count |
| GET | `/api/suggested` | Get suggested videos |
| GET | `/api/force-download` | Proxy video download |

## SEO Features

- **Dynamic Metadata** per page
- **Structured Data** (Open Graph, Twitter Cards)
- **Canonical URLs**
- **Sitemap.xml** (auto-generated daily)
- **Robots.txt**
- **Semantic HTML**
- **Fast Loading** with Next.js Image optimization

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `MONGO_URI`
   - `GA_ID`
4. Deploy

### Docker

```bash
docker build -t desi-p9x9 .
docker run -p 3000:3000 --env-file .env.local desi-p9x9
```

## License

ISC