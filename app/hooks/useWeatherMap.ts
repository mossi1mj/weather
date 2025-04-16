// hooks/useWeatherMap.ts
import { useEffect, useState } from "react";

interface WeatherData {
    city: string;
    lat: number;
    lon: number;
    temperature: number;
}

export const useWeatherMap = () => {
    const [data, setData] = useState<WeatherData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cities around Detroit
    const cities = [
        { name: "Detroit", lat: 42.3314, lon: -83.0458 },
        { name: "Toledo", lat: 41.6528, lon: -83.5379 },
        { name: "Flint", lat: 43.0125, lon: -83.6875 },
        { name: "Ann Arbor", lat: 42.2808, lon: -83.7430 },
        { name: "Windsor", lat: 42.3149, lon: -83.0364 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    cities.map(async (city) => {
                        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
                        const res = await fetch(url);
                        const json = await res.json();
                        return {
                            city: city.name,
                            lat: city.lat,
                            lon: city.lon,
                            temperature: json.current_weather.temperature,
                        };
                    })
                );
                setData(results);
            } catch (err) {
                setError("Failed to fetch weather data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};