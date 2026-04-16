const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { extractText } = require('./services/extractionService');
const { generateStudyMaterials } = require('./services/aiService');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    // 1. Extract text
    console.log(`Extracting text from ${req.file.originalname}...`);
    const extractedText = await extractText(filePath, fileType);

    if (!extractedText || extractedText.trim() === '') {
      // Clean up
      fs.unlinkSync(filePath);
      return res.status(422).json({ error: 'Could not extract any text from the file.' });
    }

    // 2. Generate AI materials
    console.log('Generating AI study materials...');
    const materials = await generateStudyMaterials(extractedText);

    // Clean up
    fs.unlinkSync(filePath);

    // Return the response
    res.json({
      success: true,
      data: {
        originalFileName: req.file.originalname,
        extractedText,
        summaries: materials.summaries || [],
        notes: materials.notes || "",
        flashcards: materials.flashcards || []
      }
    });

  } catch (error) {
    console.error('Error processing upload:', error);
    // Clean up on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message || 'Error processing file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
