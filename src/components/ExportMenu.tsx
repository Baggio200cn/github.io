import { useState, useRef, useEffect } from 'react';
import { toWeChatHtml } from '../utils/exporters/wechat';
import { toFullHtml, toBareHtml } from '../utils/exporters/html';
import { toMarkdown } from '../utils/exporters/md';
import { useToast } from './Toast';
import './ExportMenu.css';

interface ExportMenuProps {
  markdown: string;
}

export default function ExportMenu({ markdown }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const copyToClipboard = async (text: string, format: string) => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported');
      }
      await navigator.clipboard.writeText(text);
      addToast(`已复制 ${format} 到剪贴板`, 'success');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to copy:', error);
      addToast(`复制失败：${error instanceof Error ? error.message : '未知错误'}`, 'error');
    }
  };

  const handleExport = async (type: 'wechat' | 'html-full' | 'html-bare' | 'markdown') => {
    try {
      let content: string;
      let format: string;

      switch (type) {
        case 'wechat':
          content = await toWeChatHtml(markdown);
          format = 'WeChat 格式';
          break;
        case 'html-full':
          content = await toFullHtml(markdown);
          format = 'HTML (含样式)';
          break;
        case 'html-bare':
          content = await toBareHtml(markdown);
          format = 'HTML (无样式)';
          break;
        case 'markdown':
          content = toMarkdown(markdown);
          format = 'Markdown';
          break;
      }

      await copyToClipboard(content, format);
    } catch (error) {
      console.error('Export failed:', error);
      addToast('导出失败，请重试', 'error');
    }
  };

  return (
    <div className="export-menu" ref={menuRef}>
      <button
        className="export-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        导出 ▾
      </button>
      
      {isOpen && (
        <div className="export-menu-dropdown">
          <button
            className="export-menu-item"
            onClick={() => handleExport('wechat')}
          >
            <span className="export-icon">📱</span>
            <span>WeChat 格式</span>
          </button>
          <button
            className="export-menu-item"
            onClick={() => handleExport('html-full')}
          >
            <span className="export-icon">🌐</span>
            <span>HTML (含样式)</span>
          </button>
          <button
            className="export-menu-item"
            onClick={() => handleExport('html-bare')}
          >
            <span className="export-icon">📄</span>
            <span>HTML (无样式)</span>
          </button>
          <button
            className="export-menu-item"
            onClick={() => handleExport('markdown')}
          >
            <span className="export-icon">📝</span>
            <span>Markdown</span>
          </button>
        </div>
      )}
    </div>
  );
}
