// src/components/TopicsPage/TopicForm.jsx

import { useState } from "react";

export default function TopicForm({
  topics = [],
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
  newTopicText,
  onNewTopicChange,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEdit = (topic) => {
    setEditingId(topic._id);
    setEditingText(topic.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = () => {
    if (editingId && editingText.trim() !== "") {
      onUpdateTopic(editingId, editingText.trim());
      cancelEdit();
    }
  };

  return (
    <div className="topic-form">
      <div className="new-topic-row">
        <input
          type="text"
          placeholder="New topic"
          value={newTopicText}
          onChange={onNewTopicChange}
          aria-label="New topic"
        />
        <button
          className="controls-btn"
          onClick={(e) => {
            e.preventDefault();
            onAddTopic && onAddTopic();
          }}
        >
          Add
        </button>
      </div>

      <ul className="topic-edit-list">
        {topics.map((t) => (
          <li key={t._id} className="topic-edit-item">
            {editingId === t._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  aria-label={`Edit ${t.name}`}
                />
                <button onClick={saveEdit} className="controls-btn">
                  Save
                </button>
                <button onClick={cancelEdit} className="controls-btn">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="topic-name">{t.name}</span>
                <button
                  onClick={() => startEdit(t)}
                  className="controls-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTopic && onDeleteTopic(t._id)}
                  className="controls-btn"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}