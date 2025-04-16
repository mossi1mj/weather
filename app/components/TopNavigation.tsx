"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Search } from 'lucide-react';
import React, { FC, useState } from 'react';

const TopNavigation: FC = () => {
    const [unit, setUnit] = useState<"C" | "F">("F");
    const toggleUnit = () => {
        setUnit((prev) => (prev === "F" ? "C" : "F"));
    };

    return (
        <div className="w-full px-4 py-3 backdrop-blur-md bg-white/5 shadow-glass border-b border-white/10 flex items-center justify-between rounded-b-2xl">
            {/* Left section: search + city */}
            <div className="flex items-center space-x-4">
                {/* Search input */}
                <div className="relative">
                    <Input
                        placeholder="Search for location"
                        className="pl-10 pr-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 placeholder-white/60 focus:outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
                </div>

                {/* City chip */}
                <div className="hidden sm:flex items-center space-x-2 bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/20 text-sm">
                    <Home className="h-4 w-4 text-white" />
                    <span className="font-medium">Detroit</span>
                    <span className="text-xs">🌤️ 44°</span>
                </div>
            </div>

            {/* Right section: unit toggle */}
            <div
                className="relative w-14 h-8 bg-white/10 border border-white/20 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300"
                onClick={toggleUnit}
            >
                <div
                    className={`absolute h-6 w-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs font-semibold transition-transform duration-300 ${unit === "F" ? "translate-x-0" : "translate-x-6"
                        }`}
                >
                    °{unit}
                </div>
            </div>
        </div>
    );
};

export default TopNavigation;
