import { useState } from 'react';
import UploadZone from './components/UploadZone';
import TextViewer from './components/TextViewer';
import NotesView from './components/NotesView';
import FlashcardSet from './components/FlashcardSet';
import { BookOpen } from 'lucide-react';
import './index.css';

function App() {
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUploadComplete = async (file) => {
    setLoading(true);
    setError('');
    
    // We will talk to our Express backend on port 3001
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to process file');
      }

      setStudyData(result.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <BookOpen size={40} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px', color: 'var(--primary-color)' }} />
          Smart Study Builder
        </h1>
        <p>Upload a PDF or Image, and let AI generate summaries, notes, and flashcards.</p>
      </header>

      <main>
        {/* Upload State */}
        {!studyData && !loading && (
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <UploadZone onUpload={handleUploadComplete} />
            {error && <div style={{ color: 'var(--danger)', marginTop: '1rem', textAlign: 'center' }}>Error: {error}</div>}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card loading-overlay" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="loader"></div>
            <p>Processing your file and generating study materials... This might take a moment.</p>
          </div>
        )}

        {/* Results Dashboard State */}
        {studyData && !loading && (
          <div className="dashboard-grid">
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <TextViewer extractedText={studyData.extractedText} />
              <button 
                className="btn-primary" 
                onClick={() => setStudyData(null)}
                style={{ alignSelf: 'flex-start' }}
              >
                Upload Another File
              </button>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <NotesView summaries={studyData.summaries} notes={studyData.notes} />
              <FlashcardSet flashcards={studyData.flashcards} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
