import React from 'react';

const ContentArea = () => {
    return (
        <section className="content">
            <div id="content-area" className="content-area">
                <button id="edit-content" className="edit-btn">Edit</button>
                <p className="welcome">Select a topic from the contents to view it here.</p>
            </div>
        </section>
    );
};

export default ContentArea;