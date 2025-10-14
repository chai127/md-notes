import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTopic } from '../../utlis/api';

function TopicItem({ topic, onRefresh }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this topic? All associated notes will be deleted.')) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteTopic(topic._id);
            onRefresh(); // Refresh the topics list
        } catch (err) {
            setError('Failed to delete topic. Please try again.');
            console.error('Error deleting topic:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <li className="topic-item">
            <Link to={`/notes/${topic._id}`} className="topic-link">
                {topic.name}
            </Link>
            <div className="topic-actions">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="delete-button"
                    title="Delete topic"
                >
                    {isDeleting ? '...' : '×'}
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </li>
    );
}

export default TopicItem;
