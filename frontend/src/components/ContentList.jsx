import React from 'react';

const TableOfContents = () => {
    return (
        <section className="toc">
            <h2>Contents</h2>
            <div className="toc-header">
                <button id="add-section" className="add-btn">+</button>
            </div>
            <ul id="toc-list" className="toc-list" aria-label="Contents">
            </ul>
            <p className="hint">Click an item to open the section below.</p>
        </section>
    );
};

export default TableOfContents;