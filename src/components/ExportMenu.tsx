import { useState, useRef, useEffect } from 'react';
import { toWeChatHtml } from '../utils/exporters/wechat';
import { toFullHtml, toBareHtml } from '../utils/exporters/html';
import { toMarkdown } from '../utils/exporters/md';
import { useToast } from './Toast';
import './ExportMenu.css';
import { copyHtmlToClipboard, copyTextToClipboard } from '../utils/clipboard';

interface ExportMenuProps {
  markdown: string;
}

export default function ExportMenu({ markdown }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

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

  const copyAsHtml = async (html: string, label: string) => {
    try {
      await copyHtmlToClipboard(html);
      addToast(`已复制 ${label} 到剪贴板（HTML）`, 'success');
      setIsOpen(false);
    } catch (e: any) {
      console.error(e);
      addToast(`复制失败：${e?.message ?? '未知错误'}`, 'error');
    }
  };

  const copyAsText = async (text: string, label: string) => {
    try {
      await copyTextToClipboard(text);
      addToast(`已复制 ${label} 到剪贴板`, 'success');
      setIsOpen(false);
    } catch (e: any) {
      console.error(e);
      addToast(`复制失败：${e?.message ?? '未知错误'}`, 'error');
    }
  };

  const handleExport = async (type: 'wechat' | 'html-full' | 'html-bare' | 'markdown') => {
    try {
      switch (type) {
        case 'wechat': {
          const html = await toWeChatHtml(markdown);
          return copyAsHtml(html, 'WeChat 格式');
        }
        case 'html-full': {
          const html = await toFullHtml(markdown);
          return copyAsHtml(html, 'HTML（含样式）');
        }
        case 'html-bare': {
          const html = await toBareHtml(markdown);
          return copyAsHtml(html, 'HTML（无样式）');
        }
        case 'markdown': {
          const md = toMarkdown(markdown);
          return copyAsText(md, 'Markdown');
        }
      }
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
          <button className="export-menu-item" onClick={() => handleExport('wechat')}>
            <span className="export-icon">📱</span>
            <span>WeChat 格式</span>
          </button>
          <button className="export-menu-item" onClick={() => handleExport('html-full')}>
            <span className="export-icon">🌐</span>
            <span>HTML（含样式）</span>
          </button>
          <button className="export-menu-item" onClick={() => handleExport('html-bare')}>
            <span className="export-icon">📄</span>
            <span>HTML（无样式）</span>
          </button>
          <button className="export-menu-item" onClick={() => handleExport('markdown')}>
            <span className="export-icon">📝</span>
            <span>Markdown</span>
          </button>
        </div>
      )}
    </div>
  );
}
