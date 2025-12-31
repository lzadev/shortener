'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { createShortUrl, getVisitCount } from '@/lib/api';
import { ShortUrlDto } from '@/lib/types';
import { toast } from 'sonner';
import { Link2, Copy, Check, Loader2, ArrowRight, Eye, TrendingUp, Calendar, ExternalLink, BarChart3 } from 'lucide-react';

interface UrlShortenerFormProps {
    onUrlCreated?: (url: ShortUrlDto) => void;
}

export function UrlShortenerForm({ onUrlCreated }: UrlShortenerFormProps) {
    const [longUrl, setLongUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState<ShortUrlDto | null>(null);
    const [copied, setCopied] = useState(false);
    const [isLoadingVisits, setIsLoadingVisits] = useState(false);
    const [showVisitsModal, setShowVisitsModal] = useState(false);
    const [visitCount, setVisitCount] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleViewClicks = async () => {
        if (!shortUrl) return;

        setShowVisitsModal(true);
        setIsLoadingVisits(true);
        setVisitCount(null);

        try {
            const count = await getVisitCount(shortUrl.code);
            setVisitCount(count);
        } catch (error) {
            console.error('Failed to load visits:', error);
            toast.error('Failed to load visit count');
        } finally {
            setIsLoadingVisits(false);
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
                                ref={inputRef}
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
                <Card className="p-6 border border-gray-200 shadow-sm bg-white">
                    <div className="space-y-4">
                        {/* Short URL with Copy Button */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                                <code className="text-sm font-mono text-gray-900">
                                    {shortUrl.shortUrl}
                                </code>
                            </div>
                            <Button
                                onClick={handleCopy}
                                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-medium transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Copied
                                    </>
                                ) : (
                                    'Copy URL'
                                )}
                            </Button>
                        </div>

                        {/* Long URL */}
                        <div className="text-sm">
                            <span className="font-medium text-gray-700">Long URL: </span>
                            <a
                                href={shortUrl.longUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                            >
                                {shortUrl.longUrl}
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button
                                onClick={handleViewClicks}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3.5 text-base shadow-sm hover:shadow transition-all"
                            >
                                <Eye className="h-5 w-5 mr-2" />
                                View Total Clicks
                            </Button>
                            <Button
                                onClick={() => {
                                    setShortUrl(null);
                                    setLongUrl('');
                                    setTimeout(() => inputRef.current?.focus(), 100);
                                }}
                                variant="outline"
                                className="flex-1 border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-50 text-gray-700 hover:text-purple-700 font-semibold py-3.5 text-base transition-all"
                            >
                                <ArrowRight className="h-5 w-5 mr-2" />
                                Shorten Another URL
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Visits Modal */}
            <Dialog open={showVisitsModal} onOpenChange={setShowVisitsModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                            Visit Statistics
                        </DialogTitle>
                        <DialogDescription>
                            Track the performance of your shortened URL
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {shortUrl && (
                            <div className="space-y-3">
                                {/* Short URL Info */}
                                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <p className="text-xs font-medium text-purple-700 mb-1">Short URL</p>
                                    <div className="flex items-center gap-2">
                                        <code className="text-sm font-mono text-purple-900 flex-1 truncate">
                                            {shortUrl.shortUrl}
                                        </code>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => window.open(shortUrl.shortUrl, '_blank')}
                                            className="h-8 w-8 p-0 hover:bg-purple-100"
                                        >
                                            <ExternalLink className="h-4 w-4 text-purple-600" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Long URL Info */}
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <p className="text-xs font-medium text-gray-700 mb-1">Original URL</p>
                                    <a
                                        href={shortUrl.longUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all block"
                                    >
                                        {shortUrl.longUrl}
                                    </a>
                                </div>

                                {/* Visit Count Display */}
                                <div className="text-center py-8">
                                    {isLoadingVisits ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
                                            <p className="text-sm text-gray-600">Loading visit data...</p>
                                        </div>
                                    ) : visitCount !== null ? (
                                        <div className="space-y-2">
                                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-2">
                                                <BarChart3 className="h-12 w-12 text-purple-600" />
                                            </div>
                                            <h3 className="text-5xl font-bold text-gray-900">{visitCount}</h3>
                                            <p className="text-lg text-gray-600">
                                                {visitCount === 1 ? 'Total Click' : 'Total Clicks'}
                                            </p>
                                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                                                <Calendar className="h-4 w-4" />
                                                <span>All time</span>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => setShowVisitsModal(false)}
                            variant="outline"
                            className="flex-1"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleCopy}
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy URL
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
