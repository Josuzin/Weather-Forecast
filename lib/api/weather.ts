import axios from 'axios';
import { WeatherData } from '@/lib/types/weather';

const API_KEY = "6e5dd2cffd684aacba8165059242911" || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherByLocation = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};