const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});


app.use(bodyParser.json());


function extractWords(text) {
  return text
    .toLowerCase()
    .match(/\b\w+\b/g) || []; // Use a regular expression to find words
}

// Endpoint to upload a text file and process it
app.post('/process-text', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }


  const text = req.file.buffer.toString('utf8');
  const words = extractWords(text);
  const wordCount = {};
  const coOccurrenceCount = {};


  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    wordCount[word] = (wordCount[word] || 0) + 1;

    if (i < words.length - 1) {
      const coWord = words[i + 1];
      const coWordPair = `${word} ${coWord}`;
      coOccurrenceCount[coWordPair] = (coOccurrenceCount[coWordPair] || 0) + 1;
    }
  }


  const sortedWordCount = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const sortedCoOccurrenceCount = Object.entries(coOccurrenceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  res.json({
    topWords: sortedWordCount,
    topCoOccurringWords: sortedCoOccurrenceCount,
    wordFrequencies: wordCount,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
