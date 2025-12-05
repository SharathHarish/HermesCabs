// API Configuration
// This file determines which backend URL to use

export const getApiUrl = () => {
  // In production (Vercel), always use Render backend
  if (process.env.NODE_ENV === 'production') {
    return 'https://rydeon.onrender.com';
  }
  
  // In development, check for environment variable or use localhost
  return process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:8000';
};

export const API_URL = getApiUrl();
