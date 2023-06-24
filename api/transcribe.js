const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const audioData = req.body;

  const response = await fetch('https://api.deepgram.com/v1/listen', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/octet-stream'
    },
    body: audioData
  });

  const transcription = await response.json();

  res.status(200).send(transcription);
};
