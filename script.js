// Play the chime when the button is clicked
document.getElementById('chimeButton').addEventListener('click', function() {
    const chimeSound = new Audio('chime3.mp3');
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

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(() => {
  console.log('Models loaded successfully');
  startVideo();
}).catch(err => console.error('Model loading failed', err));

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      document.getElementById('video').srcObject = stream;
    })
    .catch(err => console.error(err));
}

video.addEventListener('play', () => {
    console.log('Video is playing');
    setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
    console.log(detections);
  }, 100);
});

