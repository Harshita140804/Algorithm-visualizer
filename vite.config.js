import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This tells Vite to use the React plugin so JSX code works correctly
export default defineConfig({
  plugins: [react()],
});