import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            // Proxying API requests to the backend server
            '/api': {
                target: 'http://localhost:5173', // Your backend server URL
                changeOrigin: true, // Needed for virtual hosted sites
                secure: false,      // Set to false if your backend is not using HTTPS
            },
        },
    },
})
