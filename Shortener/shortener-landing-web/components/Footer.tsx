'use client';

import { Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <p className="text-sm text-gray-600 mb-2 flex items-center justify-center gap-1">
                        <span>© {new Date().getFullYear()} URL Shortener</span>
                        <span className="text-gray-400">•</span>
                        <span>Fast & Reliable Link Shortening</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <span>Powered by</span>
                        <a
                            href="https://github.com/lzadev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 transition-colors font-medium inline-flex items-center gap-1"
                        >
                            <Github className="h-3.5 w-3.5" />
                            LZADEV
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
