'use client';

import { UrlShortenerForm } from '@/components/url-shortener-form';
import { Link2, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
              <Link2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">URL Shortener</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">Fast & Reliable URL Shortening</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
            Shorten URLs from{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Any Link
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your long URLs into short, shareable links in seconds. Track clicks and manage all your links in one place.
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="mb-16 md:mb-20">
          <UrlShortenerForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>Built with Next.js and shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}
