// Get the record button... test!
const recordButton = document.getElementById('recordButton');

// Variable to keep track of whether we're currently recording
let isRecording = false;

// Variables for recording audio
let mediaRecorder;
let audioChunks = [];

// Function to start recording
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();

  mediaRecorder.addEventListener('dataavailable', event => {
    audioChunks.push(event.data);
  });
}

// Function to stop recording
async function stopRecording() {
  mediaRecorder.stop();

  const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
  const audioData = await audioBlob.arrayBuffer();

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: audioData
  });

  const transcription = await response.text();

  console.log(transcription);

  // Clear audio chunks for next recording
  audioChunks = [];
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
