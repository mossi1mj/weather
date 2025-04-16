import { useEffect, useState } from "react";

export type WeatherData = {
  temperature: number;
  feelsLike: number;
  weatherDescription: string;
  emoji: string;
  windSpeed: number;
  windDirection: number;
  isDay: boolean;
  precipitationProbability: number;
  pressure: number;
  dewPoint: number;
  time: string;
};

export function useWeather(): {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // const url = `https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0458&current=temperature_2m,apparent_temperature,weathercode,windspeed,winddirection,is_day&timezone=America%2FDetroit`;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0458&current=temperature_2m,dew_point_2m,apparent_temperature,precipitation_probability,weathercode,windspeed,winddirection,is_day,pressure_msl&timezone=America%2FDetroit`;

        const res = await fetch(url);
        const json = await res.json();

        const current = json.current;
        if (!current) throw new Error("Missing current weather data");

        const degreeConverter = (celsius: number) => {
          return (celsius * 9) / 5 + 32;
        };
        const temperature = degreeConverter(current.temperature_2m);
        const feelsLike = degreeConverter(current.apparent_temperature);
        const windSpeed = current.windspeed;
        const windDirection = current.winddirection;
        const isDay = current.is_day === 1;
        const weatherCode = current.weathercode;
        const time = new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
        const precipitationProbability = current.precipitation_probability;
        const pressure = current.pressure_msl;
        const dewPoint = current.dew_point_2m;

        const weatherMap: Record<number, { emoji: string; desc: string }> = {
          0: { emoji: isDay ? "☀️" : "🌙", desc: "Clear" },
          1: { emoji: "🌤️", desc: "Mainly clear" },
          2: { emoji: "⛅", desc: "Partly cloudy" },
          3: { emoji: "☁️", desc: "Cloudy" },
          45: { emoji: "🌫️", desc: "Fog" },
          48: { emoji: "🌫️", desc: "Depositing fog" },
          51: { emoji: "🌦️", desc: "Light drizzle" },
          53: { emoji: "🌦️", desc: "Moderate drizzle" },
          55: { emoji: "🌧️", desc: "Dense drizzle" },
          61: { emoji: "🌦️", desc: "Light rain" },
          63: { emoji: "🌧️", desc: "Moderate rain" },
          65: { emoji: "🌧️", desc: "Heavy rain" },
          66: { emoji: "🌧️", desc: "Freezing rain" },
          71: { emoji: "🌨️", desc: "Snow fall" },
          80: { emoji: "🌦️", desc: "Rain showers" },
          95: { emoji: "⛈️", desc: "Thunderstorm" },
          96: { emoji: "⛈️", desc: "Thunderstorm + hail" },
        };

        const mapped = weatherMap[weatherCode] || {
          emoji: "❓",
          desc: "Unknown",
        };

        const weather: WeatherData = {
          temperature,
          feelsLike,
          weatherDescription: mapped.desc,
          emoji: mapped.emoji,
          windSpeed,
          windDirection,
          isDay,
          precipitationProbability,
          pressure,
          dewPoint,
          time,
        };

        setData(weather);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return { data, loading, error };
}
