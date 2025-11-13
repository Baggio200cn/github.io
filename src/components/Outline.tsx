import { useEffect, useState } from 'react';
import './Outline.css';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface OutlineProps {
  markdown: string;
  previewRef?: React.RefObject<HTMLDivElement>;
}

export default function Outline({ markdown, previewRef }: OutlineProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    // Parse headings from markdown
    const lines = markdown.split('\n');
    const parsedHeadings: HeadingItem[] = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        // Generate a simple ID based on text and index
        const id = `heading-${text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')}-${index}`;
        parsedHeadings.push({ id, text, level });
      }
    });
    
    setHeadings(parsedHeadings);
  }, [markdown]);

  const scrollToHeading = (text: string) => {
    if (!previewRef?.current) return;
    
    // Find the heading element in the preview
    const previewElement = previewRef.current;
    const headingElements = previewElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    for (const element of headingElements) {
      if (element.textContent?.trim() === text) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  };

  if (headings.length === 0) {
    return (
      <div className="outline">
        <div className="outline-header">
          <h3>目录</h3>
        </div>
        <div className="outline-empty">
          暂无标题
        </div>
      </div>
    );
  }

  return (
    <div className="outline">
      <div className="outline-header">
        <h3>目录</h3>
      </div>
      <div className="outline-list">
        {headings.map((heading, index) => (
          <button
            key={`${heading.id}-${index}`}
            className={`outline-item outline-level-${heading.level}`}
            onClick={() => scrollToHeading(heading.text)}
            title={heading.text}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </div>
  );
}
