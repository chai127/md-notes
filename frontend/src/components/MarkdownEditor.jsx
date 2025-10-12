import React, { useState, useEffect } from 'react';
import '../style/MarkdownEditor.css';

export default function MarkdownEditor({ initialValue = '', onClose, onSave }) {
  const [value, setValue] = useState(initialValue);
  const [copied, setCopied] = useState(false);

  useEffect(() => setValue(initialValue), [initialValue]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'notes.md';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="md-modal-overlay">
      <div className="md-modal">
        <header className="md-header">
          <h3>Edit Markdown</h3>
          <div className="md-actions">
            <button onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={handleDownload}>Download</button>
            <button onClick={() => onClose()}>Close</button>
          </div>
        </header>

        <div className="editor-grid">
          <textarea
            className="editor-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
          />

          <div className="preview">
            <h4>Preview</h4>
            <pre>{value}</pre>
            <button className="save-btn" onClick={() => onSave(value)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
