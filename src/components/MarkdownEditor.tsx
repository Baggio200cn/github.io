                                                                                                   
  import React, { useEffect, useRef } from 'react'                                                                                
  import { markdownToHtml } from '../utils/markdownToHtml'                                                                        
  import { useSettings } from '../state/useSettings'                                                                              
  import './MarkdownEditor.css'                                                                                                   
                                                                                                                                  
  interface MarkdownEditorProps {                                                                                                 
    value: string                                                                                                                 
    onChange: (value: string) => void                                                                                             
    previewRef?: React.RefObject<HTMLDivElement>                                                                                  
  }                                                                                                                               
                                                                                                                                  
  function MarkdownEditor({                                                                                                       
    value,                                                                                                                        
    onChange,                                                                                                                     
    previewRef: externalPreviewRef,                                                                                               
  }: MarkdownEditorProps) {                                                                                                       
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const internalPreviewRef = useRef<HTMLDivElement>(null)                                                                       
    const previewRef = externalPreviewRef || internalPreviewRef                                                                   
    const settings = useSettings()                                                                                                

    // 首次挂载时自动聚焦编辑区                                                                                                   
    useEffect(() => {                                                                                                             
      if (textareaRef.current) {                                                                                                  
        textareaRef.current.focus()                                                                                               
      }                                                                                                                           
    }, [])                                                                                                                        
                                                                                                                                  
    // 根据自定义主题色更新预览区域的 CSS 变量                                                                                    
    useEffect(() => {                                                                                                             
      if (previewRef.current) {                                                                                                   
        previewRef.current.style.setProperty(                                                                                     
          '--theme-primary',                                                                                                      
          settings.themeColor,                                                                                                    
        )                                                                                                                         
      }                                                                                                                           
    }, [settings.themeColor, previewRef])                                                                                         
                                                                                                                                  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {                                                         
      onChange(e.target.value)                                                                                                    
    }                                                                                                                             
                                                                                                                                  
    // Tab 缩进为两个空格
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {                                                      
      if (e.key === 'Tab') {                                                                                                      
        e.preventDefault()
        const textarea = e.currentTarget                                                                                          
        const start = textarea.selectionStart                                                                                     
        const end = textarea.selectionEnd                                                                                         
                                                                                                                                  
        const newValue =                                                                                                          
          value.substring(0, start) + '  ' + value.substring(end)                                                                 
        onChange(newValue)                                                                                                        
                                                                                                                                  
        window.setTimeout(() => {                                                                                                 
          textarea.selectionStart = textarea.selectionEnd = start + 2                                                             
        }, 0)                                                                                                                     
      }                                                                                                                           
    }                                                                                                                             
                                                                                                                                  
    // 在当前位置插入图片语法                                                                                                     
    const handleInsertImage = () => {
      const url = window.prompt('请输入图片地址 URL：')                                                                           
      if (!url) return                                                                                                            
                                                                                                                                  
      const alt = window.prompt('请输入图片描述（可选）：') || ''                                                                 
      const snippet = `![${alt}](${url})`                                                                                         
                                                                                                                                  
      const textarea = textareaRef.current                                                                                        
                                                                                                                                  
      // 如果拿不到 textarea，就直接追加到文末                                                                                    
      if (!textarea) {                                                                                                            
        const prefix = value.endsWith('\n') ? '' : '\n\n'                                                                         
        onChange(value + prefix + snippet)                                                                                        
        return                                                                                                                    
      }                                                                                                                           
                                                                                                                                  
      const start = textarea.selectionStart                                                                                       
      const end = textarea.selectionEnd                                                                                           
                                                                                                                                  
      const before = value.substring(0, start)                                                                                    
      const after = value.substring(end)                                                                                          
      const newValue = before + snippet + after                                                                                   
      onChange(newValue)                                                                                                          
                                                                                                                                  
      // 把光标移动到插入片段之后                                                                                                 
      window.requestAnimationFrame(() => {                                                                                        
        const pos = start + snippet.length                                                                                        
        textarea.selectionStart = textarea.selectionEnd = pos                                                                     
        textarea.focus()                                                                                                          
      })                                                                                                                          
    }                                                                                                                             
                                                                                                                                  
    const htmlContent = markdownToHtml(value)                                                                                     
                                                                                                                                  
    // 预览区域的主题相关 class                                                                                                   
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
                                                                                                                                  
          <div className="editor-toolbar">                                                                                        
            <button                                                                                                               
              type="button"                                                                                                       
              className="editor-toolbar-button"                                                                                   
              onClick={handleInsertImage}                                                                                         
            >                                                                                                                     
              插入图片                                                                                                            
            </button>                                                                                                             
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
  
