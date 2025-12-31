# URL Shortener - Landing Page

This is the landing page project for the URL Shortener application. It's a separate Next.js application that showcases the features and provides information about contributing to the project.

## Project Structure

```
landing/
├── app/
│   ├── page.tsx              # Landing page
│   ├── contribute/
│   │   └── page.tsx          # Contribution page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/               # UI components (shadcn/ui)
└── lib/                      # Utilities
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The landing page will be available at `http://localhost:3000` (or `3001` if 3000 is in use).

## Features

- **Landing Page**: Showcases URL shortener features, stats, and call-to-action
- **Contribute Page**: Information about contributing to the open-source project
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components

## Deployment

This project can be deployed independently from the main application:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect to repository and deploy
- **Static Export**: `npm run build` for static hosting

## Tech Stack

- Next.js 16.1.1 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons
