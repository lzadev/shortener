'use client';

import { Card } from '@/components/ui/card';
import { Link2, Eye, TrendingUp } from 'lucide-react';

interface StatsDisplayProps {
    totalUrls: number;
    totalVisits: number;
}

export function StatsDisplay({ totalUrls, totalVisits }: StatsDisplayProps) {
    const stats = [
        {
            label: 'Total URLs',
            value: totalUrls,
            icon: Link2,
        },
        {
            label: 'Total Visits',
            value: totalVisits,
            icon: Eye,
        },
        {
            label: 'Avg. Visits',
            value: totalUrls > 0 ? Math.round(totalVisits / totalUrls) : 0,
            icon: TrendingUp,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
                <Card key={index} className="p-6 border border-gray-200 bg-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-purple-100">
                            <stat.icon className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
