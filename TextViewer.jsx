import { useState } from 'react';

export default function TextViewer({ extractedText }) {
  const [text, setText] = useState(extractedText);

  return (
    <div className="card">
      <h2>Raw Extracted Text</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Review and edit the optical character recognition (OCR) or PDF parsed results.
      </p>
      <textarea
        className="editable-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
