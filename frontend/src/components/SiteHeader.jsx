import React from 'react';

const SiteHeader = ({ title, subtitle, theme, toggleTheme, onTitleClick }) => {
    const isLight = theme === 'light';

    return (
        <header className="site-header">
            <div className="container">
                {/* Clicking the title calls onTitleClick (which sets selectedTopic to null in App.js) */}
                <h1 onClick={onTitleClick} style={{ cursor: 'pointer' }}>
                    {title}
                </h1>
                <p className="sub">{subtitle}</p>
                <div className="controls">
                    <button 
                        id="toggle-theme" 
                        onClick={toggleTheme} 
                        aria-pressed={String(isLight)}
                    >
                        Toggle Theme
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;