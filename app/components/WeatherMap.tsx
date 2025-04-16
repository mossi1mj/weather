"use client";

export default function WeatherMap() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-glass backdrop-blur-md">
      <iframe
        title="Windy Clouds Map - Detroit"
        width="100%"
        height="500"
        src="https://embed.windy.com/embed2.html?lat=42.3314&lon=-83.0458&detailLat=42.3314&detailLon=-83.0458&width=650&height=450&zoom=6&level=surface&overlay=clouds&menu=false&message=false&marker=false&calendar=now&pressure=false&type=map&location=coordinates&detail=false&metricWind=default&metricTemp=default&radarRange=-1"
        frameBorder="0"
        className="w-full h-[500px]"
      ></iframe>
    </div>
  );
}
