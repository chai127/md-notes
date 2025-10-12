import { useState } from "react";
import { topicsData } from "../data/topicsData.js";

import TopicList from "../components/TopicsPage/TopicList.jsx"
import TopicForm from "../components/TopicsPage/TopicForm.jsx"
import "../style/TopicsPage.css"

/**
 * Splits a list into chunks (columns) of a specified size.
 * @param {Array<Object>} array The source array (topics).
 * @param {number} chunkSize The maximum number of items per chunk (column).
 * @returns {Array<Array<Object>>} An array of topic arrays (columns).
 */
const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};


export default function TopicsPage() {

  

    const [topics, setTopics] = useState(topicsData);
      const [newTopicText, setNewTopicText] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);

    const TOPICS_PER_COLUMN = 10;
    const topicColumns = chunkArray(topics, TOPICS_PER_COLUMN);

    const toggleForm = () => {
        setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
    };

    const handleNewTopicChange = (event) => {
        setNewTopicText(event.target.value);
    };

    // Function to add a new topic
    const addTopic = (event) => {
        event.preventDefault(); // Prevents default form submission behavior

        if (!newTopicText.trim()) return; // Don't add empty topics

        const newTopic = {
            id: Date.now(), // Simple unique ID
            name: newTopicText.trim(),
        };

        setTopics((prevTopics) => [...prevTopics, newTopic]);
        setNewTopicText(""); // Clear the input field after adding
    };

    // Function to delete a topic by its ID
    const deleteTopic = (topicId) => {
        setTopics((prevTopics) =>
            prevTopics.filter((topic) => topic.id !== topicId)
        );
    };

  return (
    <>
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
                                newTopicText={newTopicText}
                                onNewTopicChange={handleNewTopicChange}
                                onAddTopic={addTopic}
                            />
                        )}


           <div className="toc-columns-container"> 
              {topicColumns.map((columnTopics, columnIndex) => (
                //for now the topic list isnt getting anything there
                 <TopicList 
                        key={columnIndex} // Use index as key since the list structure is stable
                        topicsData={columnTopics}
                        // Optionally, you might pass the starting index if TopicList needs it 
                        // startOffset={columnIndex * TOPICS_PER_COLUMN} 
                    />
                ))}
            </div>
        </section>
    </div>
    </main>
    </>
  );
}
