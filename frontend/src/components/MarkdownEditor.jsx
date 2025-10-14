import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { convertPlainTextToMarkdown, convertMarkdownToPlainText } from '../utlis/markdownUtils';
import '../style/MarkdownEditor.css';

export default function MarkdownEditor({ initialValue = '', onClose, onSave }) {
  const [plainText, setPlainText] = useState(convertMarkdownToPlainText(initialValue));
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const insertLine = (type) => {
    const lines = {
      solid: '\n\n---\n\n',
      dotted: '\n\n· · · · ·\n\n',
      double: '\n\n==========\n\n',
      thick: '\n\n_____\n\n'
    };
    
    const textarea = document.querySelector('.editor-text');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = plainText.substring(0, start) + lines[type] + plainText.substring(end);
    setPlainText(newText);
  };

  useEffect(() => {
    setPlainText(convertMarkdownToPlainText(initialValue));
  }, [initialValue]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      const markdown = convertPlainTextToMarkdown(plainText);
      
      if (!markdown.trim()) {
        setError('Note content cannot be empty');
        return;
      }

      await onSave(markdown);
    } catch (err) {
      setError(err.message || 'Failed to save note');
      console.error('Error saving note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    try {
      const textToCopy = previewMode ? 
        convertPlainTextToMarkdown(plainText) : 
        plainText;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleDownload = () => {
    const content = previewMode ? 
      convertPlainTextToMarkdown(plainText) : 
      plainText;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
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
          <h3>Edit Notes</h3>
          <div className="md-actions">
            <button onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            <button 
              onClick={handleCopy}
              disabled={isSaving}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              onClick={handleDownload}
              disabled={isSaving}
            >
              Download
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving || !plainText.trim()}
              className="save-btn"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={onClose}
              disabled={isSaving}
              className="close-btn"
            >
              Close
            </button>
            {error && <div className="editor-error">{error}</div>}
          </div>
        </header>

        <div className="editor-grid">
          <div className="editor-container">
            {previewMode ? (
              <div className="preview-content markdown-body">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: marked(convertPlainTextToMarkdown(plainText)) 
                  }} 
                />
              </div>
            ) : (
              <textarea
                className="editor-text"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                onKeyDown={(e) => {
                  // Ctrl/Cmd + L for solid line
                  if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                    e.preventDefault();
                    insertLine('solid');
                  }
                  // Ctrl/Cmd + . for dotted line
                  if ((e.ctrlKey || e.metaKey) && e.key === '.') {
                    e.preventDefault();
                    insertLine('dotted');
                  }
                  // Ctrl/Cmd + = for double line
                  if ((e.ctrlKey || e.metaKey) && e.key === '=') {
                    e.preventDefault();
                    insertLine('double');
                  }
                  // Ctrl/Cmd + - for thick line
                  if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                    e.preventDefault();
                    insertLine('thick');
                  }
                }}
               placeholder={`Start typing your notes...

Quick Tips:
- Indent lines to create bullet lists
- Use ! at the start for bold text (e.g., !Important)
- Use @ at the start for italic text (e.g., @Note)
- First non-empty line becomes a heading
- Separate paragraphs with blank lines
- 4-space indent or triple backticks (\`\`\`) creates code blocks

Line Shortcuts:
- Ctrl/Cmd + L → Insert solid line (─────)
- Ctrl/Cmd + . → Insert dotted line (· · · · ·)
- Ctrl/Cmd + = → Insert double line (=========)
- Ctrl/Cmd + - → Insert thick line (_____)`}
                spellCheck={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
