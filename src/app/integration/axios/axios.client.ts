import { AuthStorage } from '@/app/storage/auth.storage';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API_BASE_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    // Get the auth token from the store
    const { bearerToken } = AuthStorage.get();

    // If the token is present, set it in the Authorization header
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
