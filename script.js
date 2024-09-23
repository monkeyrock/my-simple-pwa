// Play the chime when the button is clicked
document.getElementById('chimeButton').addEventListener('click', function() {
    const chimeSound = new Audio('chime.mp3');
    chimeSound.play();
});

// Register the service worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }, err => {
                console.log('Service Worker registration failed:', err);
            });
    });
}
