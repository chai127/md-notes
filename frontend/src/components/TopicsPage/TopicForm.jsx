import { useState } from "react";
import { createTopic } from "../../utlis/api";

export default function TopicForm({ onTopicCreated }) {
  const [topicName, setTopicName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!topicName.trim()) {
      setError("Topic name cannot be empty");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await createTopic({ name: topicName.trim() });
      setTopicName("");
      onTopicCreated && onTopicCreated(response.data);
      
    } catch (err) {
      setError("Failed to create topic. Please try again.");
      console.error("Error creating topic:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <div className="new-topic-row">
        <input
          type="text"
          placeholder="Enter new topic name"
          value={topicName}
          onChange={(e) => {
            setTopicName(e.target.value);
            setError(null);
          }}
          disabled={isSubmitting}
          aria-label="New topic name"
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || !topicName.trim()}
        >
          {isSubmitting ? "Creating..." : "Add Topic"}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}