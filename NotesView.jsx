import { useState } from 'react';

export default function NotesView({ summaries, notes }) {
  const [editableNotes, setEditableNotes] = useState(notes);
  
  return (
    <div className="card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2>AI Summaries</h2>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-main)' }}>
          {summaries && summaries.map((point, idx) => (
            <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
          ))}
        </ul>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />

      <div>
        <h2>Generated Notes</h2>
        <textarea
          className="editable-area"
          value={editableNotes}
          onChange={(e) => setEditableNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
