"use client";

import { useWeather } from "../hooks/useWeather";

export default function WeatherCard() {
  const { data, loading, error } = useWeather();

  if (loading) return <div className="text-white">Loading...</div>;
  if (error || !data) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-white max-w-md w-full">
      <span className="text-sm text-white/80">{data.time}</span>
      <div className="text-4xl flex items-center gap-2">
        <span>{data.emoji}</span>
        <span className="font-semibold">{Math.round(data.temperature)}°</span>
      </div>
      <div className="text-sm text-white/80">
        {data.weatherDescription} · Feels like {Math.round(data.feelsLike)}°
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip label="Wind" value={`${data.windSpeed} km/h`} />
        <Chip label="Rain" value={`${data.precipitationProbability}%`} />
        <Chip label="Pressure" value={`${data.pressure} hPa`} />
        <Chip label="Dew Pt" value={`${Math.round(data.dewPoint)}°`} />
      </div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm">
      <span className="font-medium text-white">{label}: </span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}
