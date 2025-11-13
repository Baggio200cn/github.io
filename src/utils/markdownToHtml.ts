import { marked } from 'marked';

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function markdownToHtml(markdown: string): string {
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return '<p>解析 Markdown 时出错</p>';
  }
}
