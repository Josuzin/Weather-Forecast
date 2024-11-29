'use client';

import { useState, useEffect } from 'react';
import { useToast, toast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem('weatherFavorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (city: string) => {
    const newFavorites = [...favorites, city];
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    toast({
      title: 'City added to favorites',
      description: `${city} has been added to your favorites list.`,
    });
  };

  const removeFavorite = (city: string) => {
    const newFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    toast({
      title: 'City removed from favorites',
      description: `${city} has been removed from your favorites list.`,
    });
  };

  const isFavorite = (city: string) => favorites.includes(city);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
