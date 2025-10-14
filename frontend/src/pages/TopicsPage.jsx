import { useState, useEffect } from "react";
import { getTopics, createTopic, updateTopic as updateTopicAPI, deleteTopic as deleteTopicAPI } from "../utlis/api";

import TopicList from "../components/TopicsPage/TopicList.jsx";
import TopicForm from "../components/TopicsPage/TopicForm.jsx";

import "../style/TopicsPage.css";

/**
 * Splits an array into smaller chunks of a given size.
 * Used to divide topics into columns.
 */
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export default function TopicsPage() {
  // ---------------- State ----------------
  const [topics, setTopics] = useState([]);
  const [newTopicText, setNewTopicText] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const TOPICS_PER_COLUMN = 10;
  
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
      setError('Failed to fetch topics');
      console.error('Error fetching topics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const topicColumns = chunkArray(topics, TOPICS_PER_COLUMN);


  const toggleForm = () => setIsFormOpen((prev) => !prev);

  const handleNewTopicChange = (event) => {
    setNewTopicText(event.target.value);
  };


  const addTopic = async (event) => {
    if (event && event.preventDefault) event.preventDefault();
    const name = newTopicText.trim();
    if (!name) return;

    try {
      await createTopic({ name });
      await fetchTopics();
      setNewTopicText("");
      setError(null);
    } catch (err) {
      setError('Failed to create topic');
      console.error('Error creating topic:', err);
    }
  };

  const updateTopic = async (topicId, newName) => {
    try {
      await updateTopicAPI(topicId, { name: newName });
      await fetchTopics();
      setError(null);
    } catch (err) {
      setError('Failed to update topic');
      console.error('Error updating topic:', err);
    }
  };

  const deleteTopic = async (topicId) => {
    if (!window.confirm('Are you sure you want to delete this topic?')) return;
    
    try {
      await deleteTopicAPI(topicId);
      await fetchTopics();
      setError(null);
    } catch (err) {
      setError('Failed to delete topic');
      console.error('Error deleting topic:', err);
    }
  };

  return (
    <main className="container main-grid">
      <div className="container">
        <section className="toc">
          <h2>Contents</h2>

          <div className="controls">
            <button className="controls-btn" onClick={toggleForm}>
              {isFormOpen ? "Close" : "Edit"}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {isFormOpen && (
            <TopicForm
              topics={topics}
              onAddTopic={addTopic}
              onUpdateTopic={updateTopic}
              onDeleteTopic={deleteTopic}
              newTopicText={newTopicText}
              onNewTopicChange={handleNewTopicChange}
            />
          )}

          {isLoading ? (
            <div className="loading">Loading topics...</div>
          ) : (
            <div className="toc-columns-container">
              {topicColumns.map((columnTopics, columnIndex) => (
                <TopicList
                  key={columnIndex}
                  topicsData={columnTopics}
                  onUpdateTopic={updateTopic}
                  onDeleteTopic={deleteTopic}
                />
              ))}
              {topics.length === 0 && (
                <div className="empty-state">No topics yet. Create your first topic to get started!</div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
