self.addEventListener('install', (event) => {
    console.log("Almacenando archivos en cachee....ESPE");
    const wu = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const addFiles = ""; // Aquí puedes agregar los archivos que deseas almacenar en caché
                console.log("Service Worker installed Espe");
                resolve();
            }, 1000);
            self.skipWaiting(); // Forzar la activación inmediata del Service Worker
        } catch (error) {
            reject(error);
        }
    });
    event.waitUntil(wu); // Asegura que la instalación se complete antes de activar el Service Worker
});
self.addEventListener('activate', (event) => {
    //Elimina cache antigua si es necesario
    console.log("Service Worker activated");
    event.waitUntil(clients.claim()); // Asegura que el Service Worker tome el control de las páginas abiertas
});
self.addEventListener('fetch', (event) => {
    console.log("Cacheando claims");
    // event.respondWith(fetch(event.request.url));
});

self.addEventListener("sync", (event) => {
    console.log(event);
});

self.addEventListener("push", (event) => {
    console.log("Push notification received",event);
});
