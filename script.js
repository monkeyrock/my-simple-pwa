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

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        const video = document.getElementById('cameraStream');
        video.srcObject = stream;
        video.play();
    });
}

document.getElementById('captureButton').addEventListener('click', function() {
    const video = document.getElementById('cameraStream');
    const canvas = document.getElementById('photoCanvas');
    const context = canvas.getContext('2d');

    // Ensure the canvas is the same size as the video element
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Convert the image to black and white
    for (let i = 0; i < data.length; i += 4) {
      let brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      data[i] = brightness;     // red
      data[i + 1] = brightness; // green
      data[i + 2] = brightness; // blue
    }
    // Overwrite the original image
    context.putImageData(imageData, 0, 0);
});
