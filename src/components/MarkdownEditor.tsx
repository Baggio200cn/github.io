import { useEffect, useRef } from 'react'
import { markdownToHtml } from '../utils/markdownToHtml'
import { useSettings } from '../state/useSettings'
import './MarkdownEditor.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  previewRef?: React.RefObject<HTMLDivElement>
}

function MarkdownEditor({ value, onChange, previewRef: externalPreviewRef }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const internalPreviewRef = useRef<HTMLDivElement>(null)
  const previewRef = externalPreviewRef || internalPreviewRef
  const settings = useSettings()

  useEffect(() => {
    // Auto-focus on mount
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Apply custom theme color
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.style.setProperty('--theme-primary', settings.themeColor);
    }
  }, [settings.themeColor, previewRef])

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

  // Build class names for theme system
  const previewClassName = [
    'preview-content',
    'preview-content-themed',
    `preview-theme-${settings.theme}`,
    `preview-font-${settings.fontFamily}`,
    `preview-size-${settings.fontSize}`,
    `code-theme-${settings.codeTheme}`,
  ].join(' ')

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
          ref={previewRef}
          className={previewClassName}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
