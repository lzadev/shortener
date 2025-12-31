# URL Shortener Frontend

A modern, beautiful Next.js frontend for the URL Shortener API, built with shadcn/ui components.

## Features

- 🎨 Modern dark mode design with glassmorphism effects
- ⚡ Fast and responsive interface
- 📊 Real-time statistics dashboard
- 📋 One-click copy to clipboard
- 🔗 URL validation and error handling
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- URL Shortener API running (default: http://localhost:5000)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the API URL:

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

If your API runs on a different port, update the URL accordingly.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Toaster
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles and custom utilities
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── url-shortener-form.tsx
│   ├── url-card.tsx
│   └── stats-display.tsx
└── lib/
    ├── api.ts              # API client
    ├── types.ts            # TypeScript types
    └── utils.ts            # Utility functions
```

## API Integration

The frontend connects to the following API endpoints:

- `POST /shortener` - Create a new short URL
- `GET /` - Get all short URLs
- `GET /shortener/{code}/visits` - Get visit count for a URL

## Customization

### Colors

The app uses custom gradient utilities defined in `globals.css`:

- `.gradient-primary` - Purple gradient
- `.gradient-secondary` - Pink gradient
- `.gradient-success` - Blue gradient

### Animations

Custom animations are available:

- `.animate-gradient` - Animated gradient background
- `.animate-float` - Floating animation
- `.glass` - Glassmorphism effect

## License

MIT
