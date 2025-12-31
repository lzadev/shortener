'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link2, Zap, BarChart3, Shield, Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Shorten URLs in milliseconds with our optimized infrastructure and caching.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: BarChart3,
            title: 'Real-time Analytics',
            description: 'Track clicks and visits in real-time with live updates.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Shield,
            title: 'Secure & Reliable',
            description: 'Enterprise-grade reliability with robust security and data protection.',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: Link2,
            title: 'Custom Short Links',
            description: 'Generate unique, memorable short codes for all your URLs automatically.',
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            icon: Github,
            title: 'Open Source',
            description: 'Fully open-source project. Contribute, customize, and self-host freely.',
            gradient: 'from-gray-700 to-gray-900'
        }
    ];

    const stats = [
        { value: '10K+', label: 'URLs Shortened' },
        { value: '200+', label: 'Daily Clicks' },
        { value: '99.9%', label: 'Uptime' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50">
                        <Zap className="h-3.5 w-3.5 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">Fast & Reliable URL Shortening</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                        Shorten URLs from{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Any Link
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Transform your long URLs into short, shareable links in seconds. Track clicks
                        and manage all your links in one place.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/app">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 text-lg">
                                <Link2 className="mr-2 h-5 w-5" />
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="https://github.com/yourusername/url-shortener" target="_blank">
                            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2">
                                <Github className="mr-2 h-5 w-5" />
                                View on GitHub
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-20 md:py-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything you need to master{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            URL shortening
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to make URL management effective and enjoyable
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="p-6 border border-gray-200 hover:border-purple-300 transition-all hover:shadow-lg">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who trust our platform for their URL shortening needs
                    </p>
                    <Link href="/app">
                        <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg">
                            Start Shortening URLs
                        </Button>
                    </Link>
                </div>
            </section>


            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-12">
                <div className="container mx-auto px-4">
                    {/* Copyright and Powered By */}
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
                                LZADev
                            </a>
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                        <Link href="/app" className="hover:text-gray-900 transition-colors inline-flex items-center gap-1.5">
                            <Link2 className="h-4 w-4" />
                            ShortURL
                        </Link>
                        <Link href="/app" className="hover:text-gray-900 transition-colors inline-flex items-center gap-1.5">
                            <BarChart3 className="h-4 w-4" />
                            URL Click Counter
                        </Link>
                        <Link href="/contribute" className="hover:text-gray-900 transition-colors inline-flex items-center gap-1.5">
                            <Heart className="h-4 w-4" />
                            Contribute
                        </Link>
                        <a
                            href="https://github.com/yourusername/url-shortener"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 transition-colors inline-flex items-center gap-1.5"
                        >
                            <Github className="h-4 w-4" />
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
