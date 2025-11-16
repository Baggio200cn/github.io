import { useState, useRef } from 'react'                                                                                                                                               
  import MarkdownEditor from './components/MarkdownEditor'
  import Toolbar from './components/Toolbar'                                                                                                                                             
  import Outline from './components/Outline'                                                                                                                                             
  import StylePanel from './components/RightPanel/StylePanel'                                                                                                                            
  import { ToastContainer } from './components/ToastContainer'                                                                                                                           
  import './App.css'                                                                                                                                                                     
  import './styles/themes.css'                                                                                                                                                           
                                                                                                                                                                                         
  const INITIAL_MARKDOWN = `# 欢迎使用 Markdown 编辑器                                                                                                                                   
                                                                                                                                                                                         
  ## 功能特性                                                                                                                                                                            
                                                                                                                                                                                         
  - **实时预览**：左侧编辑，右侧实时预览                                                                                                                                                 
  - **Markdown 语法支持**：支持标准 Markdown 语法                                                                                                                                        
  - **美观样式**：优雅的预览样式                                                                                                                                                         
                                                                                                                                                                                         
  ## 示例内容                                                                                                                                                                            
                                                                                                                                                                                         
  ### 文本样式                                                                                                                                                                           
                                                                                                                                                                                         
  这是 **粗体文本**，这是 *斜体文本*，这是 ***粗斜体文本***。                                                                                                                            
                                                                                                                                                                                         
  ### 列表                                                                                                                                                                               
                                                                                                                                                                                         
  #### 无序列表                                                                                                                                                                          
  - 项目一                                                                                                                                                                               
  - 项目二                                                                                                                                                                               
  - 项目三                                                                                                                                                                               
                                                                                                                                                                                         
  #### 有序列表                                                                                                                                                                          
  1. 第一项                                                                                                                                                                              
  2. 第二项                                                                                                                                                                              
  3. 第三项                                                                                                                                                                              
                                                                                                                                                                                         
  ### 引用                                                                                                                                                                               
                                                                                                                                                                                         
  > 这是一段引用文本。                                                                                                                                                                   
  > 可以有多行内容。                                                                                                                                                                     
                                                                                                                                                                                         
  ### 代码                                                                                                                                                                               
                                                                                                                                                                                         
  行内代码：\`const hello = 'world'\`                                                                                                                                                    
                                                                                                                                                                                         
  代码块：                                                                                                                                                                               
  \`\`\`javascript                                                                                                                                                                       
  function greet(name) {                                                                                                                                                                 
    console.log(\`Hello, \${name}!\`);                                                                                                                                                   
  }                                                                                                                                                                                      
  greet('Markdown');                                                                                                                                                                     
  \`\`\`                                                                                                                                                                                 
                                                                                                                                                                                         
  ### 链接和图片                                                                                                                                                                         
                                                                                                                                                                                         
  [访问 GitHub](https://github.com)                                                                                                                                                      
                                                                                                                                                                                         
  ### 表格                                                                                                                                                                               
                                                                                                                                                                                         
  | 列1 | 列2 | 列3 |                                                                                                                                                                    
  |-----|-----|-----|                                                                                                                                                                    
  | 数据1 | 数据2 | 数据3 |                                                                                                                                                              
  | 数据4 | 数据5 | 数据6 |                                                                                                                                                              
                                                                                                                                                                                         
  ---                                                                                                                                                                                    
                                                                                                                                                                                         
  开始编辑您的文档吧！`                                                                                                                                                                  
                                                                                                                                                                                         
  function App() {                                                                                                                                                                       
    const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN)                                                                                                                           
    const previewRef = useRef<HTMLDivElement>(null)                                                                                                                                      
                                                                                                                                                                                         
    return (                                                                                                                                                                             
      <div className="app">                                                                                                                                                              
        <Toolbar markdown={markdown} />                                                                                                                                                  
                                                                                                                                                                                         
        <div className="app-main">                                                                                                                                                       
          <Outline markdown={markdown} previewRef={previewRef} />                                                                                                                        
                                                                                                                                                                                         
          <MarkdownEditor                                                                                                                                                                
            value={markdown}                                                                                                                                                             
            onChange={setMarkdown}                                                                                                                                                       
            previewRef={previewRef}                                                                                                                                                      
          />                                                                                                                                                                             
                                                                                                                                                                                         
          <StylePanel />                                                                                                                                                                 
        </div>                                                                                                                                                                           
                                                                                                                                                                                         
        <ToastContainer />                                                                                                                                                               
      </div>                                                                                                                                                                             
    )                                                                                                                                                                                    
  }                                                                                                                                                                                      
                                                                                                                                                                                         
  export default App                                          
