// src/components/TopicsPage/TopicForm.jsx

export default function TopicForm({ newTopicText, onNewTopicChange, onAddTopic }) {
    return (
        <form className="topic-form" onSubmit={onAddTopic}>
            <input
                type="text"
                placeholder="New topic name"
                value={newTopicText}
                onChange={onNewTopicChange}
                aria-label="New topic name"
            />
            <button type="submit" disabled={!newTopicText.trim()}>
                Add Topic
            </button>
            <p className="form-tip">
                *Delete functionality is available directly in the list below.
            </p>
        </form>
    );
}