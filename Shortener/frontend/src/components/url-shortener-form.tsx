'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { createShortUrl } from '@/lib/api';
import { ShortUrlDto } from '@/lib/types';
import { toast } from 'sonner';
import { Link2, Copy, Check, Loader2, ArrowRight } from 'lucide-react';

interface UrlShortenerFormProps {
    onUrlCreated?: (url: ShortUrlDto) => void;
}

export function UrlShortenerForm({ onUrlCreated }: UrlShortenerFormProps) {
    const [longUrl, setLongUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState<ShortUrlDto | null>(null);
    const [copied, setCopied] = useState(false);

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidUrl(longUrl)) {
            toast.error('Please enter a valid URL');
            return;
        }

        setIsLoading(true);
        try {
            const result = await createShortUrl({ longUrl });
            setShortUrl(result);
            toast.success('URL shortened successfully!');
            onUrlCreated?.(result);
            setLongUrl('');
        } catch (error) {
            toast.error('Failed to shorten URL. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (shortUrl) {
            await navigator.clipboard.writeText(shortUrl.shortUrl);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            <Card className="p-6 border border-gray-200 shadow-sm bg-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Input
                                type="url"
                                placeholder="Enter your long URL here..."
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                className="h-12 pl-4 pr-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading || !longUrl}
                            className="h-12 px-6 bg-black hover:bg-gray-800 text-white font-medium transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Shortening
                                </>
                            ) : (
                                <>
                                    Shorten
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>

            {shortUrl && (
                <Card className="p-6 border border-purple-200 shadow-sm bg-purple-50/50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-900">
                                Your shortened URL
                            </span>
                            <Check className="h-4 w-4 text-purple-600" />
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-lg bg-white border border-purple-200">
                            <code className="flex-1 text-sm font-mono text-gray-900 truncate">
                                {shortUrl.shortUrl}
                            </code>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCopy}
                                className="shrink-0 h-8 w-8 p-0 hover:bg-purple-100"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-purple-600" />
                                ) : (
                                    <Copy className="h-4 w-4 text-gray-600" />
                                )}
                            </Button>
                        </div>

                        <div className="text-xs text-gray-600">
                            <span className="font-medium">Original:</span>{' '}
                            <span className="break-all">{shortUrl.longUrl}</span>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
