import React, { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { topicsData } from '../data/topicsData.js';
import { convertTopicToMarkdown } from '../utlis/markdownUtils.js';
import '../style/ContentArea.css';
import '../style/components.css';

const ContentArea = ({ topicId }) => {
    // simple local state: open editor modal and current markdown
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [markdown, setMarkdown] = useState('');

    // if topicId is provided, find content; otherwise show placeholder
    const topic = topicId ? topicsData.find(t => t._id === topicId) : null;
    const renderedContent = topic ? topic.notes.map(n => `### ${n.title}\n\n${n.content}`).join('\n\n') : '';

    const openEditor = () => {
        const md = topic ? convertTopicToMarkdown(topic) : renderedContent || '';
        setMarkdown(md);
        setIsEditorOpen(true);
    };

    const closeEditor = () => setIsEditorOpen(false);

    const handleSave = (newMd) => {
        // For now, just update local preview and close the editor.
        setMarkdown(newMd);
        setIsEditorOpen(false);
        // TODO: persist changes to backend or localStorage if desired
    };

    return (
        <section className="content">
            <div id="content-area" className="content-area">
                <div className="content-controls">
                    <button id="edit-content" className="controls-btn primary" onClick={openEditor}>Convert</button>
                </div>

                {topic ? (
                    <div className="topic-display">
                        <h3>{topic.name}</h3>
                        {topic.notes.length === 0 ? (
                            <p className="welcome">No notes yet for this topic.</p>
                        ) : (
                            topic.notes.map(note => (
                                <article key={note._id} className="note">
                                    <h4>{note.title}</h4>
                                    <p>{note.content}</p>
                                </article>
                            ))
                        )}
                    </div>
                ) : (
                    <p className="welcome">Select a topic from the contents to view it here.</p>
                )}

                {isEditorOpen && (
                    <MarkdownEditor
                        initialValue={markdown}
                        onClose={closeEditor}
                        onSave={handleSave}
                    />
                )}
            </div>
        </section>
    );
};

export default ContentArea;