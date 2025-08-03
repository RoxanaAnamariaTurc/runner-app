// Service Worker for Crosul Speranței PWA
// Version 1.0.0

const CACHE_NAME = "crosul-sperantei-v1";
const STATIC_CACHE = "crosul-static-v1";
const IMAGE_CACHE = "crosul-images-v1";

// Files to cache immediately (essential for app to work)
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-512x512.png",
  // Add your main JS/CSS bundles here when built
];

// Install event - cache essential static assets
self.addEventListener("install", (event) => {
  console.log("🚀 Service Worker installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("📦 Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("✅ Static assets cached successfully");
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Failed to cache static assets:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("🎯 Service Worker activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old cache versions
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== IMAGE_CACHE &&
              cacheName !== CACHE_NAME
            ) {
              console.log("🗑️ Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker activated");
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - handle all network requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.destination === "image") {
    // Image caching strategy
    event.respondWith(handleImageRequest(request));
  } else if (
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/"
  ) {
    // Static assets strategy
    event.respondWith(handleStaticRequest(request));
  } else {
    // Default network-first strategy
    event.respondWith(handleDefaultRequest(request));
  }
});

// Image caching strategy: Cache first, then network
async function handleImageRequest(request) {
  try {
    // Check cache first
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log("📸 Image served from cache:", request.url);
      return cachedResponse;
    }

    // If not in cache, fetch from network
    console.log("🌐 Fetching image from network:", request.url);
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache the image for future use
      cache.put(request, networkResponse.clone());
      console.log("💾 Image cached:", request.url);
    }

    return networkResponse;
  } catch (error) {
    console.error("❌ Image request failed:", error);
    // Return a fallback image or empty response
    return new Response("", { status: 404 });
  }
}

// Static assets strategy: Cache first, fallback to network
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("❌ Static request failed:", error);
    // For HTML requests, try to serve the main page from cache
    if (request.destination === "document") {
      const cache = await caches.open(STATIC_CACHE);
      return cache.match("/") || new Response("App offline", { status: 503 });
    }

    return new Response("", { status: 404 });
  }
}

// Default strategy: Network first, fallback to cache
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.log("🔍 Network failed, checking cache for:", request.url);

    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("Offline", { status: 503 });
  }
}

// Background sync for future enhancements
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("🔄 Background sync triggered");
    // Handle background sync here if needed
  }
});

// Push notifications (for future use)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log("📢 Push notification received:", data);

    const options = {
      body: data.body,
      icon: "/assets/icons/icon-192x192.png",
      badge: "/assets/icons/icon-192x192.png",
      data: data.data || {},
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Handle cache management - prevent unlimited growth
async function cleanupCaches() {
  const imageCache = await caches.open(IMAGE_CACHE);
  const requests = await imageCache.keys();

  // If we have more than 50 images cached, remove oldest ones
  if (requests.length > 50) {
    const oldestRequests = requests.slice(0, requests.length - 50);
    await Promise.all(
      oldestRequests.map((request) => imageCache.delete(request))
    );
    console.log(`🧹 Cleaned up ${oldestRequests.length} old cached images`);
  }
}

// Run cleanup periodically
setInterval(cleanupCaches, 60000); // Every minute
