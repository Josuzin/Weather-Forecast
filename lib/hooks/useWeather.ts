'use client';

import { useQuery } from '@tanstack/react-query';
import { getWeatherByLocation, getWeatherByCity } from '@/lib/api/weather';
import { useState, useEffect } from 'react';

export const useWeather = (city?: string) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, [city]);

  return useQuery({
    queryKey: ['weather', city || coordinates?.lat],
    queryFn: () =>
      city
        ? getWeatherByCity(city)
        : coordinates
        ? getWeatherByLocation(coordinates.lat, coordinates.lon)
        : Promise.reject('No location available'),
    enabled: Boolean(city || coordinates),
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });
};