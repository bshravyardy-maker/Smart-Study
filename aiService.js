// Optional: If you had the @google/genai SDK, you would require it here.
// For this MVP, we provide a Mock implementation if the API key is not present.
require('dotenv').config();

async function generateStudyMaterials(extractedText) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'mock') {
    // If a real API implementation was needed and SDK installed:
    // const { GoogleGenAI } = require('@google/genai');
    // const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    // This is skipped for brevity since we want a fast MVP to demonstrate functionality
    console.log("Using real generative API (not fully implemented in MVP shell, falling back to mock).");
  }

  console.log("Using Mock AI Service for generation.");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Extract a few sentences to make the mock somewhat related to the text
  const sentences = extractedText
    .split(/[\.\!\?]/)
    .map(s => s.trim())
    .filter(s => s.length > 20);

  const sampleSentence1 = sentences[0] || "Sample important concept from text.";
  const sampleSentence2 = sentences[1] || "Another key finding or detail.";

  return {
    summaries: [
      `Main Topic: The text discusses concepts related to: ${sampleSentence1.substring(0, 50)}...`,
      "Key Finding 1: The document highlights several important features of the core subject.",
      "Key Finding 2: Structural and systematic approaches are emphasized.",
      "Conclusion: Overall, it acts as a comprehensive reference guide."
    ],
    notes: `## Overview\nThis document provides an in-depth look at the provided text.\n\n## Important Concepts\n- **Concept A**: ${sampleSentence1}\n- **Concept B**: ${sampleSentence2}\n\n## Conclusion\nMake sure to review these main points before your quiz.`,
    flashcards: [
      { id: 1, question: "What is the main topic mentioned?", answer: sampleSentence1 },
      { id: 2, question: "What is the secondary point?", answer: sampleSentence2 },
      { id: 3, question: "Why is this important?", answer: "Structural approaches emphasize reliability." },
      { id: 4, question: "What is the conclusion?", answer: "It acts as a comprehensive reference guide." }
    ]
  };
}

module.exports = { generateStudyMaterials };
