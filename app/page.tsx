import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import WeatherMap from "./components/WeatherMap";
import WeatherCard from "./components/WeatherCard";

export default function Home() {
  return (
    <>
      <WeatherCard />
      <WeatherMap />
    </>
  );
}
