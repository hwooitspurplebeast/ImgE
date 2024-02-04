const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve uploaded images
app.use('/images', express.static('uploads'));

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.send(`Image uploaded successfully. View it here: ${imageUrl}`);
  } else {
    res.status(400).send('No image file provided.');
  }
});

// Serve the HTML file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
