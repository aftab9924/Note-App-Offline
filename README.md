# Note-App-Offline
Offline-first Note App syncing local Dexie with a remote API. Supports create, update, delete, and conflict resolution via timestamps. Ensures data consistency with sync status tracking for smooth offline-online experience and reliable data synchronization.

# Tech Stack Used
React (Vite) – for building the frontend UI
Dexie.js (IndexedDB) – for offline-first data storage
Axios – to interact with a mock backend server
json-server – to simulate a REST API locally
Tailwind CSS – for rapid and responsive styling
ESLint + Prettier – for clean and consistent code

# Key Features
Offline-first book manager
Syncs local (IndexedDB) books with a remote REST API
Per-book sync status: Synced, Unsynced, Syncing..., ToDelete, Error
Optimized for refresh persistence and data integrity
CRUD operations (Create, Read, Update, Delete) with robust sync logic

# Challenges Faced
Notes deleted from the UI came back after refreshing.
PUT and POST requests to /books/:id failed due to incorrect or missing ids.
Dexie Chaining Error
Unsynced books kept re-appearing or syncing endlessly.

# Outcomes
Managing IndexedDB using Dexie
Syncing local and remote databases with conflict resolution
Understanding real-world issues in offline-first apps
Debugging async API errors and IndexedDB quirks