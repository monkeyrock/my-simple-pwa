




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
       // const video = document.getElementById('cameraStream');
        video.srcObject = stream;
        video.play();
    });
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3pfHC7Iopg8hEgen346H5Gr64YedTy-0",
  authDomain: "lookinggood-1be57.firebaseapp.com",
  projectId: "lookinggood-1be57",
  storageBucket: "lookinggood-1be57.appspot.com",
  messagingSenderId: "63258393133",
  appId: "1:63258393133:web:de56ce4d5769f6d2d996a4",
  measurementId: "G-S8BMQZF1HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase storage reference
const storage = firebase.storage();

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
<<<<<<< HEAD
<<<<<<< HEAD
    
    
    // Create the image URL from the canvas
    const dataURL = canvas.toDataURL('image/png');
    
    // Set up the download link
    const downloadLink = document.getElementById('download');
    downloadLink.href = dataURL;
    downloadLink.style.display = 'inline';  // Make the download link visible
    
      // Convert canvas to a blob (binary large object)
  canvas.toBlob(function(blob) {
    // Create a reference to the storage location
    const storageRef = firebase.storage().ref('images/photo-' + Date.now() + '.png');
    
    // Upload the blob to Firebase
    storageRef.put(blob).then(function(snapshot) {
      console.log('Image uploaded successfully');
      
      // Optionally get the download URL
      storageRef.getDownloadURL().then(function(url) {
        console.log('File available at', url);
        // You can display the URL or provide a download link to the user
      });
    });
  }, 'image/png');
    
=======
>>>>>>> parent of f8359a9 (can save photos now)
=======
>>>>>>> parent of f8359a9 (can save photos now)
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
  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream;
      video.play();

      // Start face detection after video starts playing
      video.addEventListener('play', () => {
        console.log('Video is playing');
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
          console.log(detections);
        }, 100);
      });
    })
    .catch(err => console.error('Error accessing camera', err));
}


