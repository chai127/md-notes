// src/pages/NotePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { topicsData } from '../data/topicsData.js'; // Import your dummy data

export default function NotePage() {
    // 1. Get the topicId from the URL
    const { topicId } = useParams();

    // 2. Find the corresponding topic data
    // Note: topicId from URL is a string, so we ensure comparison with strings
    const topic = topicsData.find(t => t._id === topicId);

    if (!topic) {
        return (
            <main className="container main-grid">
                <div className="container">
                    <h1>Topic Not Found (ID: {topicId})</h1>
                    <p>The requested C/C++ or embedded system topic could not be located.</p>
                </div>
            </main>
        );
    }

    // 3. Render the topic details and its notes
    return (
        <main className="container main-grid">
            <div className="container" style={{padding: '20px', background: 'var(--panel)', borderRadius: '10px'}}>
                <h1 style={{color: 'var(--accent)'}}>{topic.name}</h1>
                <p style={{fontSize: '0.9em', color: 'var(--text-faded)'}}>
                    Created: {new Date(topic.createdAt).toLocaleDateString()}
                </p>
                
                <hr style={{margin: '20px 0', border: 'none', borderBottom: '1px solid var(--border)'}} />

                <h2>Notes ({topic.notes.length})</h2>
                {topic.notes.length > 0 ? (
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {topic.notes.map(note => (
                            <li key={note._id} style={{marginBottom: '15px', borderLeft: '3px solid var(--accent-2)', paddingLeft: '10px'}}>
                                <h3 style={{marginTop: 0, marginBottom: '5px', fontSize: '1.1em'}}>{note.title}</h3>
                                <p style={{margin: 0, color: 'var(--text)'}}>{note.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No detailed notes recorded for this topic yet.</p>
                )}
            </div>
        </main>
    );
}