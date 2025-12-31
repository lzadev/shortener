'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link2, Github, Heart, Coffee, Star, Code, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ContributePage() {
    const ways = [
        {
            icon: Code,
            title: 'Code Contributions',
            description: 'Help us build new features, fix bugs, or improve performance. Check our GitHub issues for good first issues.',
            action: 'Browse Issues',
            link: 'https://github.com/yourusername/url-shortener/issues'
        },
        {
            icon: Star,
            title: 'Star on GitHub',
            description: 'Show your support by starring our repository. It helps us grow and reach more developers.',
            action: 'Star Repository',
            link: 'https://github.com/yourusername/url-shortener'
        },
        {
            icon: Coffee,
            title: 'Buy us a Coffee',
            description: 'Support the development and maintenance of this project with a one-time donation.',
            action: 'Donate',
            link: 'https://buymeacoffee.com/yourusername'
        },
        {
            icon: Users,
            title: 'Spread the Word',
            description: 'Share this project with your network, write about it, or create tutorials to help others.',
            action: 'Share Project',
            link: '#'
        }
    ];

    const contributors = [
        { name: 'Luis Zabala', role: 'Creator & Maintainer', avatar: '👨‍💻' },
        { name: 'Community', role: 'Contributors', avatar: '🌟' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50">
                        <Heart className="h-3.5 w-3.5 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">Open Source & Community Driven</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                        Help Us Build{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Together
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        This project is open source and free to use. Your contributions, whether code,
                        feedback, or financial support, help us keep it running and improving.
                    </p>
                </div>
            </section>

            {/* Ways to Contribute */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Ways to Contribute
                    </h2>
                    <p className="text-lg text-gray-600">
                        Every contribution makes a difference
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {ways.map((way, index) => {
                        const Icon = way.icon;
                        return (
                            <Card key={index} className="p-8 border border-gray-200 hover:border-purple-300 transition-all hover:shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shrink-0">
                                        <Icon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {way.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {way.description}
                                        </p>
                                        <a href={way.link} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="border-purple-300 hover:bg-purple-50 hover:border-purple-400">
                                                {way.action}
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Contributors */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Contributors
                    </h2>
                    <p className="text-lg text-gray-600">
                        Thank you to everyone who has contributed to this project
                    </p>
                </div>

                <div className="flex justify-center gap-8 max-w-2xl mx-auto">
                    {contributors.map((contributor, index) => (
                        <Card key={index} className="p-6 text-center border border-gray-200 flex-1">
                            <div className="text-5xl mb-3">{contributor.avatar}</div>
                            <div className="font-semibold text-gray-900">{contributor.name}</div>
                            <div className="text-sm text-gray-600">{contributor.role}</div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a href="https://github.com/yourusername/url-shortener/graphs/contributors" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-2">
                            <Github className="mr-2 h-4 w-4" />
                            View All Contributors
                        </Button>
                    </a>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20">
                <div className="container mx-auto px-4 text-center">
                    <Sparkles className="h-12 w-12 text-white mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to contribute?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join our community and help make URL shortening better for everyone
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://github.com/lzadev/shortener" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg">
                                <Github className="mr-2 h-5 w-5" />
                                Start Contributing
                            </Button>
                        </a>
                        <a href="https://buymeacoffee.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                                <Coffee className="mr-2 h-5 w-5" />
                                Buy us a Coffee
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                                <Link2 className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-600">
                                Open Source URL Shortener
                            </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <Link href="/" className="hover:text-gray-900 transition-colors">
                                Home
                            </Link>
                            <a href="https://github.com/lzadev/shortener" target="_blank" className="hover:text-gray-900 transition-colors flex items-center gap-1">
                                <Github className="h-4 w-4" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
