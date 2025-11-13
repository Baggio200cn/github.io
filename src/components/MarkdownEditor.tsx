import { useEffect, useRef } from 'react'
import { markdownToHtml } from '../utils/markdownToHtml'
import './MarkdownEditor.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Auto-focus on mount
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      
      // Move cursor after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  const htmlContent = markdownToHtml(value)

  return (
    <div className="markdown-editor-container">
      <div className="editor-pane">
        <div className="pane-header">
          <h2>编辑区</h2>
        </div>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="在此输入 Markdown 内容..."
          spellCheck={false}
        />
      </div>
      
      <div className="preview-pane">
        <div className="pane-header">
          <h2>预览区</h2>
        </div>
        <div 
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
