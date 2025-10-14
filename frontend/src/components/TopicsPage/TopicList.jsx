import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getTopics } from '../../utlis/api';
import TopicItem from './TopicItem';

function TopicList() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setIsLoading(true);
            const response = await getTopics();
            setTopics(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch topics. Please try again later.');
            console.error('Error fetching topics:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading topics...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="topics-container">
            <ul id="toc-list" className="toc-list" aria-label="Contents">
                {topics.map((topic) => (
                    <TopicItem 
                        key={topic._id} 
                        topic={topic}
                        onRefresh={fetchTopics}
                    />
                ))}
            </ul>
            {topics.length === 0 && (
                <p className="no-topics">No topics yet. Create your first topic to get started!</p>
            )}
        </div>
    );
}

export default TopicList;