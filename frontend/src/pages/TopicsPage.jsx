import { useState } from "react";
import { topicsData } from "../data/topicsData.js";

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
  const [topics, setTopics] = useState(topicsData);
  const [newTopicText, setNewTopicText] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const TOPICS_PER_COLUMN = 10;
  const topicColumns = chunkArray(topics, TOPICS_PER_COLUMN);


  const toggleForm = () => setIsFormOpen((prev) => !prev);

  const handleNewTopicChange = (event) => {
    setNewTopicText(event.target.value);
  };


  const addTopic = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    const name = newTopicText.trim();
    if (!name) return;

    const newTopic = {
      _id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
    };

    setTopics((prev) => [newTopic, ...prev]);
    setNewTopicText("");
  };

  const updateTopic = (topicId, newName) => {
    setTopics((prev) => prev.map((t) => (t._id === topicId ? { ...t, name: newName } : t)));
  };


  const deleteTopic = (topicId) => {
    setTopics((prev) => prev.filter((t) => t._id !== topicId));
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

          <div className="toc-columns-container">
            {topicColumns.map((columnTopics, columnIndex) => (
              <TopicList
                key={columnIndex}
                topicsData={columnTopics}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
