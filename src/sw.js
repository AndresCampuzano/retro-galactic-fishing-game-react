import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails } from 'workbox-core';

// Set custom cache names
setCacheNameDetails({
  prefix: 'retro-fishing',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
});

// Self.__WB_MANIFEST is the placeholder for the precache manifest
// This will be replaced by the Workbox InjectManifest plugin
precacheAndRoute(self.__WB_MANIFEST);

// Handle navigation requests with a Network-first strategy falling back to the precached index.html
const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  // Don't serve the offline fallback for API requests
  denylist: [/^\/api\//]
});
registerRoute(navigationRoute);

// Cache API requests with NetworkFirst strategy
registerRoute(
  /^https:\/\/api\..*\.com\/.*/i,
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
      }),
    ],
    networkTimeoutSeconds: 10,
  })
);

// Cache static assets with StaleWhileRevalidate strategy
registerRoute(
  /\.(?:js|css|html)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// Cache images with CacheFirst strategy
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// Handle offline navigation
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});