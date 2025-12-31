'use client';

import { Button } from '@/components/ui/button';
import { Link2, Github } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                        <Link2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">URL Shortener</span>
                </Link>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                        <Link
                            href="/"
                            className={pathname === '/' ? 'text-purple-600 font-medium border-b-2 border-purple-600 pb-1' : 'hover:text-gray-900 transition-colors'}
                        >
                            Home
                        </Link>
                        <Link
                            href="/contribute"
                            className={pathname === '/contribute' ? 'text-purple-600 font-medium border-b-2 border-purple-600 pb-1' : 'hover:text-gray-900 transition-colors'}
                        >
                            Contribute
                        </Link>
                        <a
                            href="https://github.com/yourusername/url-shortener"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </nav>
                    <Link href="/app">
                        <Button className="bg-black hover:bg-gray-800 text-white">
                            Start Shortening
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
