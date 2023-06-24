import API_KEY from './config.js';


// Get the record button
const recordButton = document.getElementById('recordButton');

// Create a new WebSocket connection with smart_format and diarize parameters
const socket = new WebSocket('wss://api.deepgram.com/v1/listen?token=${API_KEY}&smart_format=true&diarize=true');

// Variable to keep track of whether we're currently recording
let isRecording = false;

// Function to start recording
function startRecording() {
  // Start recording audio here and send the audio data as binary WebSocket messages
  // This will depend on how you're recording audio
}

// Function to stop recording
function stopRecording() {
  // Stop recording audio here
  // Send the 'CloseStream' message
  socket.send(JSON.stringify({ type: 'CloseStream' }));
}

// When the record button is clicked...
recordButton.addEventListener('click', () => {
  if (isRecording) {
    // If we're currently recording, stop recording
    stopRecording();
    recordButton.textContent = 'Start Recording';
  } else {
    // If we're not currently recording, start recording
    startRecording();
    recordButton.textContent = 'Stop Recording';
  }

  // Toggle the recording state
  isRecording = !isRecording;
});

// When a message is received, log the transcription response
socket.onmessage = event => {
  console.log(event.data);
};

// Don't forget to handle errors
socket.onerror = error => {
  console.error(`WebSocket error: ${error}`);
};
