import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopics } from '../utlis/api';
import ContentArea from '../components/ContentArea';
import TopicForm from '../components/TopicsPage/TopicForm';
import '../style/NotePage.css';
import '../style/components.css';

export default function NotePage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch topics when component mounts
  useEffect(() => {
    fetchTopics();
  }, []);

  // Update selected topic when URL changes or topics are loaded
  useEffect(() => {
    if (topics.length > 0 && topicId) {
      const topic = topics.find(t => t._id === topicId);
      if (topic) {
        setSelectedTopic(topic);
        setError(null);
      } else {
        setSelectedTopic(null);
        setError('Topic not found');
      }
    } else if (!topicId) {
      setSelectedTopic(null);
      setError(null);
    }
  }, [topics, topicId]);

  const fetchTopics = async () => {
    try {
      setIsLoading(true);
      const response = await getTopics();
      setTopics(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch topics');
      console.error('Error fetching topics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopic = (topic) => {
    navigate(`/notes/${topic._id}`);
  };

const handleTopicCreated = async (newTopic) => {
  try {
    await fetchTopics();
    const latestTopic = topics.find(t => t._id === newTopic._id) || newTopic;
    setSelectedTopic(latestTopic);
    navigate(`/notes/${latestTopic._id}`);
  } catch (err) {
    setError('Failed to update topics after creation');
    console.error('Error after topic creation:', err);
  }
};

  return (
    <main className="main-grid">
      <aside className="sidebar">
        <header>
          <h2>Topics</h2>
        </header>
        <TopicForm onTopicCreated={handleTopicCreated} />
        
        {isLoading ? (
          <div className="loading">Loading topics...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <nav>
            <ul className="toc-list">
              {topics.map(topic => (
                <li key={topic._id}>
                  <button
                    className={`toc-btn ${selectedTopic?._id === topic._id ? 'active' : ''}`}
                    onClick={() => handleSelectTopic(topic)}
                  >
                    {topic.name}
                  </button>
                </li>
              ))}
              {topics.length === 0 && (
                <li className="empty-state">No topics yet. Create your first topic to get started!</li>
              )}
            </ul>
          </nav>
        )}
      </aside>

      {/* Main Content Area */}
      <ContentArea 
        topic={selectedTopic}
        onNoteChange={fetchTopics}
      />
    </main>
  );
}
