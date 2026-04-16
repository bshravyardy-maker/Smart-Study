import { useState, useEffect } from 'react';

export default function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <div className="flashcard-scene" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* Front */}
        <div className="flashcard-face front">
          <h3>Question</h3>
          <p>{card.question}</p>
          <div style={{ position: 'absolute', bottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click to flip
          </div>
        </div>
        
        {/* Back */}
        <div className="flashcard-face back">
          <h3>Answer</h3>
          <p>{card.answer}</p>
          <div style={{ position: 'absolute', bottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click to flip
          </div>
        </div>

      </div>
    </div>
  );
}
