// Convert a topic object (from topicsData) to a Markdown string.
export function convertTopicToMarkdown(topic) {
  if (!topic) return '';
  const lines = [];
  
  // Title and metadata
  lines.push(`# ${topic.name}`);
  lines.push('');
  if (topic.createdAt) {
    lines.push(`> Created: ${new Date(topic.createdAt).toLocaleDateString()}`);
    lines.push('');
  }

  // Notes section
  lines.push('## Notes');
  lines.push('');

  if (Array.isArray(topic.notes) && topic.notes.length) {
    topic.notes.forEach(note => {
      if (note.title) {
        lines.push(`### ${note.title}`);
        lines.push('');
      }
      if (note.content) {
        // If content has code blocks, preserve them
        const formattedContent = note.content.replace(/`([^`]+)`/g, '```js\n$1\n```');
        lines.push(formattedContent);
        lines.push('');
      }
    });
  } else {
    lines.push('*No notes available for this topic.*');
    lines.push('');
  }

  return lines.join('\n').trim();
}export default convertTopicToMarkdown;
