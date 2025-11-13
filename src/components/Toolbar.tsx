import ExportMenu from './ExportMenu';
import { useToast } from './Toast';
import './Toolbar.css';

interface ToolbarProps {
  markdown: string;
}

export default function Toolbar({ markdown }: ToolbarProps) {
  const { addToast } = useToast();

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported');
      }
      await navigator.clipboard.writeText(markdown);
      addToast('已复制到剪贴板', 'success');
    } catch (error) {
      console.error('Failed to copy:', error);
      addToast('复制失败，请重试', 'error');
    }
  };

  const handlePublish = () => {
    // Placeholder for Sprint 1
    addToast('发布功能即将推出', 'info');
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="toolbar-title">Markdown 编辑器</h1>
      </div>
      
      <div className="toolbar-right">
        <ExportMenu markdown={markdown} />
        
        <button
          className="toolbar-button toolbar-copy"
          onClick={handleCopy}
          title="复制 Markdown"
        >
          复制
        </button>
        
        <button
          className="toolbar-button toolbar-publish"
          onClick={handlePublish}
          title="发布"
        >
          发布
        </button>
      </div>
    </div>
  );
}
