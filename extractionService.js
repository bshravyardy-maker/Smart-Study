const fs = require('fs');
const pdfParse = require('pdf-parse');
// Tesseract for local OCR
const Tesseract = require('tesseract.js');

async function extractText(filePath, fileType) {
  try {
    if (fileType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (fileType.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(
        filePath,
        'eng',
        { logger: m => console.log(m) } // Optional: log progress
      );
      return text;
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Extraction Error:', error);
    throw error;
  }
}

module.exports = { extractText };