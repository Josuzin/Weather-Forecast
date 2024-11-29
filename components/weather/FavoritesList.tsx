'use client';

import { useWeather } from '@/lib/hooks/useWeather';
import { WeatherCard } from './WeatherCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface FavoritesListProps {
  favorites: string[];
  onRemoveFavorite: (city: string) => void;
  unit: 'celsius' | 'fahrenheit';
}

export function FavoritesList({ favorites, onRemoveFavorite, unit }: FavoritesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {favorites.map((city) => (
          <FavoriteCity
            key={city}
            city={city}
            onRemove={onRemoveFavorite}
            unit={unit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FavoriteCity({
  city,
  onRemove,
  unit,
}: {
  city: string;
  onRemove: (city: string) => void;
  unit: 'celsius' | 'fahrenheit';
}) {
  const { data: weather, isLoading, error } = useWeather(city);

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (error || !weather) {
    return null;
  }

  return (
    <WeatherCard
      weather={weather}
      unit={unit}
      isFavorite={true}
      onToggleFavorite={() => onRemove(city)}
      className="h-full"
    />
  );
}