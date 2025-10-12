import React from 'react';

import TableOfContents from './TableOfContents';
import ContentArea from './ContentArea';

const MainContent = ({ topicId }) => { 
    return (
        <main className="container main-grid">
            <TableOfContents topicId={topicId} />
            <ContentArea />
        </main>
    );
};

export default MainContent;