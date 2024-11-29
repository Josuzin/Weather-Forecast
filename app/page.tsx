'use client';

import { useWeather } from '@/lib/hooks/useWeather';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { FavoritesList } from '@/components/weather/FavoritesList';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Star } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [searchCity, setSearchCity] = useState<string>('');
  const { data: weather, isLoading, error } = useWeather(searchCity);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCity(city);
  };

  const handleToggleFavorite = () => {
    if (!weather) return;
    const cityName = weather.location.name;
    if (isFavorite(cityName)) {
      removeFavorite(cityName);
    } else {
      addFavorite(cityName);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">Weather Forecast</h1>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
            >
              Switch to {unit === 'celsius' ? '°F' : '°C'}
            </Button>
          </form>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList>
            <TabsTrigger value="current">Current Weather</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              Favorites
              <Star className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="mt-6">
            {isLoading && <Skeleton className="h-[300px] w-full max-w-md" />}
            {error && <div>Error: {(error as Error).message}</div>}
            {weather && (
              <WeatherCard
                weather={weather}
                unit={unit}
                isFavorite={isFavorite(weather.location.name)}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </TabsContent>
          <TabsContent value="favorites" className="mt-6">
            <FavoritesList
              favorites={favorites}
              onRemoveFavorite={removeFavorite}
              unit={unit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}