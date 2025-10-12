import React from 'react';

const TopicSelector = ({ topics, onSelect }) => {
    return (
        <main className="container topic-selector-grid">
            <section className="toc"> 
                <h2>Select a Topic</h2>
                <ul className="toc-list">
                    {topics.map(topic => (
                        <li key={topic.id}>
                            <button 
                                onClick={() => onSelect(topic.id)}
                            >
                                {topic.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <p className="hint">Choose a major subject to view its notes.</p>
            </section>
            
            <section className="content">
                <div className="content-area">
                    <p className="welcome">Welcome to Bare Minimum Notes. Please select a topic from the left to start viewing or editing notes.</p>
                </div>
            </section>
        </main>
    );
};

export default TopicSelector;