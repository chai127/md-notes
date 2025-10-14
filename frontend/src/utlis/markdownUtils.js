// markdownUtils.js

/**
 * Convert plain text input into Markdown
 * - First non-empty line → heading
 * - Indented lines → list items
 * - Lines starting with ! → bold, @ → italic
 * - Lines with 4+ spaces → code block
 */
export function convertPlainTextToMarkdown(text) {
  const lines = text.split('\n');
  const result = [];
  let firstLineProcessed = false;
  let codeBlockActive = false;

  for (let line of lines) {
    const trimmed = line.trim();
    const indentation = line.match(/^\s*/)[0].length;

    // Handle fenced code blocks
    if (trimmed.startsWith('```')) {
      codeBlockActive = !codeBlockActive;
      result.push(line);
      continue;
    }
    if (codeBlockActive) {
      result.push(line);
      continue;
    }

    // First line → heading if not empty
    if (!firstLineProcessed && trimmed) {
      result.push(`# ${trimmed}`);
      firstLineProcessed = true;
      continue;
    }

    // Bold / italic markers
    if (trimmed.startsWith('!')) {
      result.push(`**${trimmed.substring(1)}**`);
      continue;
    }
    if (trimmed.startsWith('@')) {
      result.push(`*${trimmed.substring(1)}*`);
      continue;
    }

    // Code block if heavily indented
    if (indentation >= 4) {
      result.push('    ' + trimmed);
      continue;
    }

    // Convert indented lines (1–3 spaces) to list items
    if (indentation > 0 && trimmed) {
      result.push('- ' + trimmed);
      continue;
    }

    // Normal paragraph
    if (trimmed) result.push(trimmed);
    else result.push(''); // Preserve empty lines
  }

  return result.join('\n').trim();
}

/**
 * Convert Markdown back to editable plain text
 * - Headers → first line
 * - List items → indented lines
 * - Bold → !, Italic → @
 */
export function convertMarkdownToPlainText(markdown) {
  const lines = markdown.split('\n');
  return lines
    .map(line => {
      const trimmed = line.trim();

      // Convert heading
      if (trimmed.startsWith('#')) return trimmed.replace(/^#+\s*/, '');

      // Convert list items
      if (/^[-*]\s/.test(trimmed)) return '  ' + trimmed.replace(/^[-*]\s*/, '');

      // Bold → !
      if (/^\*\*(.*?)\*\*$/.test(trimmed)) return '!' + trimmed.replace(/^\*\*(.*?)\*\*$/, '$1');

      // Italic → @
      if (/^\*(.*?)\*$/.test(trimmed)) return '@' + trimmed.replace(/^\*(.*?)\*$/, '$1');

      return line;
    })
    .join('\n');
}

/**
 * Convert a Topic object (with notes array) into a Markdown file
 * Stores note.content as-is (assumes already Markdown)
 */
export function convertTopicToMarkdown(topic) {
  if (!topic) return '';

  const lines = [];
  lines.push(`# ${topic.name}`);
  lines.push('');

  if (topic.createdAt) {
    lines.push(`> Created: ${new Date(topic.createdAt).toLocaleDateString()}`);
    lines.push('');
  }

  lines.push('## Notes');
  lines.push('');

  if (Array.isArray(topic.notes) && topic.notes.length > 0) {
    topic.notes.forEach(note => {
      if (note.content) {
        lines.push(note.content);
        lines.push('');
      }
    });
  } else {
    lines.push('*No notes available for this topic.*');
    lines.push('');
  }

  return lines.join('\n').trim();
}

export default {
  convertPlainTextToMarkdown,
  convertMarkdownToPlainText,
  convertTopicToMarkdown,
};
