'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Eye, Check, Calendar } from 'lucide-react';
import { getVisitCount } from '@/lib/api';
import { ShortUrl } from '@/lib/types';
import { toast } from 'sonner';

interface UrlCardProps {
    url: ShortUrl;
}

export function UrlCard({ url }: UrlCardProps) {
    const [visits, setVisits] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const [isLoadingVisits, setIsLoadingVisits] = useState(false);

    const shortUrl = `${window.location.origin}/${url.code}`;

    const loadVisits = useCallback(async () => {
        setIsLoadingVisits(true);
        try {
            const count = await getVisitCount(url.code);
            setVisits(count);
        } catch (error) {
            console.error('Failed to load visits:', error);
            toast.error('Failed to load visit count');
        } finally {
            setIsLoadingVisits(false);
        }
    }, [url.code]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card className="p-6 border border-gray-200 hover:border-purple-300 transition-all bg-white hover:shadow-sm">
            <div className="space-y-4">
                {/* Short URL with Copy Button */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                        <code className="flex-1 text-sm font-mono text-gray-900 truncate">
                            {shortUrl}
                        </code>
                    </div>
                    <Button
                        onClick={handleCopy}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy URL
                            </>
                        )}
                    </Button>
                </div>

                {/* Long URL */}
                <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-700 shrink-0">Long URL:</span>
                    <a
                        href={url.longUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                    >
                        {url.longUrl}
                    </a>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                    {/* Creation Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Created {formatDate(url.createdAt)}</span>
                    </div>

                    {/* Visit Count */}
                    <div className="flex items-center gap-2">
                        {visits !== null ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full">
                                <Eye className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-700">
                                    {visits} {visits === 1 ? 'click' : 'clicks'}
                                </span>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={loadVisits}
                                disabled={isLoadingVisits}
                                className="text-sm border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                            >
                                {isLoadingVisits ? (
                                    'Loading...'
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4 mr-1.5" />
                                        View clicks
                                    </>
                                )}
                            </Button>
                        )}
                    </div>

                    {/* External Link */}
                    <div className="ml-auto">
                        <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                        >
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-1.5" />
                                Open
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
