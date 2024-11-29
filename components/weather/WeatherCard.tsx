'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { WeatherData } from '@/lib/types/weather';
import { Cloud, Droplets, Star, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'celsius' | 'fahrenheit';
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  className?: string;
}

export function WeatherCard({
  weather,
  unit,
  isFavorite,
  onToggleFavorite,
  className,
}: WeatherCardProps) {
  const temp = unit === 'celsius' ? weather.current.temp_c : weather.current.temp_f;
  const feelsLike = unit === 'celsius' ? weather.current.feelslike_c : weather.current.feelslike_f;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">{weather.location.name}</h2>
              {onToggleFavorite && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <Star
                    className={cn(
                      'h-5 w-5 transition-colors duration-200',
                      isFavorite ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-400'
                    )}
                  />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{weather.location.country}</p>
          </div>
          <motion.img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="w-16 h-16"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <motion.div
              className="flex items-center justify-between"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-4xl font-bold">
                {temp}°{unit === 'celsius' ? 'C' : 'F'}
              </p>
              <p className="text-muted-foreground">
                Feels like {feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
              </p>
            </motion.div>
            <p className="text-lg">{weather.current.condition.text}</p>
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Wind className="h-4 w-4" />
                <span>{weather.current.wind_kph} km/h</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Droplets className="h-4 w-4" />
                <span>{weather.current.humidity}%</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Cloud className="h-4 w-4" />
                <span>UV: {weather.current.uv}</span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}