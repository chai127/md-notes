import React, { useState, useEffect } from 'react';
import { topicsData } from '../data/topicsData';
import MarkdownEditor from '../components/MarkdownEditor';
import { convertTopicToMarkdown } from '../utlis/markdownUtils';
import '../style/NotePage.css';
import '../style/components.css';

export default function NotePage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    document.title = selectedTopic
      ? `${selectedTopic.name} — C++ Notes`
      : 'Bare Minimum — C++ Notes';
  }, [selectedTopic]);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const openEditor = () => {
    if (!selectedTopic) return;
    setMarkdown(convertTopicToMarkdown(selectedTopic));
    setIsEditorOpen(true);
  };

  return (
    <main className="main-grid">
      {/* Sidebar — TOC */}
      <aside className="sidebar">
        <header>
          <h2>Contents</h2>
        </header>
        <ul className="toc-list">
          {topicsData.map(topic => (
            <li key={topic._id}>
              <button
                className={`toc-btn ${selectedTopic?._id === topic._id ? 'active' : ''}`}
                onClick={() => handleSelectTopic(topic)}
              >
                {topic.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <section className="content-area">
        {selectedTopic ? (
          <>
            <header className="note-header">
              <h1>{selectedTopic.name}</h1>
              <button className="controls-btn primary" onClick={openEditor}>
                Convert
              </button>
            </header>

            <hr className="divider" />

            {selectedTopic.notes.length > 0 ? (
              selectedTopic.notes.map((note) => (
                <article key={note._id} className="note">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </article>
              ))
            ) : (
              <p className="empty">No notes yet.</p>
            )}
          </>
        ) : (
          <p className="welcome">Select a topic from the left to view it here.</p>
        )}
      </section>

      {isEditorOpen && (
        <MarkdownEditor
          initialValue={markdown}
          onClose={() => setIsEditorOpen(false)}
          onSave={(newMd) => {
            setMarkdown(newMd);
            setIsEditorOpen(false);
          }}
        />
      )}
    </main>
  );
}
