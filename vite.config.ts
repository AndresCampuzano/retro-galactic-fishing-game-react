import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['**/*'],
      manifest: {
        name: 'Retro Galactic Fishing Game',
        short_name: 'RetroFishing',
        description: 'A retro-style galactic fishing game with Windows 95 aesthetic',
        theme_color: '#008080',
        icons: [
          {
            src: 'public/images/windows-logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'public/images/windows-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'public/images/windows-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,cur}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\..*\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],
})
