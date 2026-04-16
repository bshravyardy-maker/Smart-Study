import { useState } from 'react';
import Flashcard from './Flashcard';

export default function FlashcardSet({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownIds, setKnownIds] = useState(new Set());

  if (!flashcards || flashcards.length === 0) {
    return <div className="card">No flashcards generated.</div>;
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handleKnown = () => {
    setKnownIds((prev) => new Set(prev).add(currentCard.id));
    handleNext();
  };

  const handleReview = () => {
    // maybe remove from known if it was there
    setKnownIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  };

  const progress = Math.round(((currentIndex + 1) / flashcards.length) * 100);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Flashcards</h2>
      
      <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge">Card {currentIndex + 1} of {flashcards.length}</span>
        <span className="badge" style={{ background: 'var(--success)', color: '#166534' }}>
          Known: {knownIds.size}
        </span>
      </div>

      <div style={{ width: '100%', background: 'var(--border-color)', height: '6px', borderRadius: '4px', marginBottom: '1.5rem' }}>
        <div style={{ width: `${progress}%`, background: 'var(--primary-color)', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }}></div>
      </div>

      <Flashcard card={currentCard} />

      <div className="flashcard-controls" style={{ marginTop: '2rem' }}>
        <button className="btn-review" onClick={handleReview}>Needs Review</button>
        <button className="btn-known" onClick={handleKnown}>Got It!</button>
      </div>
    </div>
  );
}
