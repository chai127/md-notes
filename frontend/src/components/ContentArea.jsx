import React, { useState, useEffect, useRef } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { getNotesByTopic, updateNote, deleteNote, createNote } from '../utlis/api';
import { marked } from 'marked';
import '../style/ContentArea.css';
import '../style/components.css';

const ContentArea = ({ topic, onNoteChange }) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // To track whether the topic has changed
    const prevTopicIdRef = useRef();

    const fetchNotes = React.useCallback(async (topicId) => {
        try {
            setIsLoading(true);
            const response = await getNotesByTopic(topicId);
            console.log("Fetched notes:", response.data);
            setNotes(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching notes:', err);
            setError('Failed to fetch notes');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (topic?._id && topic._id !== prevTopicIdRef.current) {
            fetchNotes(topic._id);
            prevTopicIdRef.current = topic._id; // Update the ref with current topic ID
        }
    }, [topic, fetchNotes]);

    const openEditor = (note = null) => {
        console.log("Opening editor for note:", note);
        setSelectedNote(note);
        setIsEditorOpen(true);
    };

    const closeEditor = () => {
        setIsEditorOpen(false);
        setSelectedNote(null);
    };

    const handleSave = async (content) => {
        if (!topic?._id) {
            setError('No topic selected');
            return;
        }

        const trimmedContent = content.trim();
        if (!trimmedContent) {
            setError('Note content cannot be empty');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const newNote = { content: trimmedContent, topicId: topic._id };

            // If updating, update the note locally first
            if (selectedNote) {
                console.log("Updating note:", selectedNote._id);
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note._id === selectedNote._id
                            ? { ...note, content: trimmedContent }
                            : note
                    )
                );
                await updateNote(selectedNote._id, newNote);
            } else {
                console.log("Creating new note:", newNote);
                const createdNote = await createNote(newNote);
                setNotes(prevNotes => [...prevNotes, createdNote.data]); // Add the new note to the local state
            }

            onNoteChange && onNoteChange();
            closeEditor();
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to save note';
            console.error("Error saving note:", err.response?.data || err);
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (noteId) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            setIsLoading(true);
            console.log("Deleting note:", noteId);

            // Optimistically update the UI: remove the note locally
            setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));

            await deleteNote(noteId); // Perform actual delete

            onNoteChange && onNoteChange();
        } catch (err) {
            console.error('Error deleting note:', err);
            setError('Failed to delete note');
        } finally {
            setIsLoading(false);
        }
    };

    if (!topic) {
        return (
            <section className="content">
                <div className="welcome-message">
                    <h2>Welcome to MD Notes</h2>
                    <p>Select a topic from the sidebar to view or edit notes.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="content">
            <div id="content-area" className="content-area">
                <div className="content-header">
                    <h2>{topic.name}</h2>
                    <div className="content-controls">
                        <button
                            className="controls-btn primary"
                            onClick={() => openEditor()}
                            disabled={isLoading}
                        >
                            New Note
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="loading">Loading notes...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : notes.length === 0 ? (
                    <p className="welcome">No notes yet for this topic. Click "New Note" to create one.</p>
                ) : (
                    <div className="notes-list">
                        {notes.map(note => (
                            <article key={note._id} className="note">
                                <div
                                    className="note-content markdown-body"
                                    dangerouslySetInnerHTML={{
                                        __html: marked(note.content)
                                    }}
                                />
                                <div className="note-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => openEditor(note)}
                                        title="Edit note"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(note._id)}
                                        title="Delete note"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {isEditorOpen && (
                <MarkdownEditor
                    initialValue={selectedNote?.content || ''}
                    onClose={closeEditor}
                    onSave={handleSave}
                />
            )}
        </section>
    );
};

export default ContentArea;
