import { renderToHtml } from '../markdown/renderer';

/**
 * Generate CSS for inline styling
 */
function getInlineStyles(): string {
  return `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.75;
  color: #3f3f3f;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
  color: #0F4C81;
  margin: 2em 0 0.75em 0;
  line-height: 1.2;
}

h1 {
  font-size: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #0F4C81;
}

h2 {
  font-size: 18px;
  padding-left: 8px;
  border-left: 3px solid #0F4C81;
}

h3 { font-size: 16px; }
h4 { font-size: 15px; }
h5, h6 { font-size: 14px; }

p {
  margin: 1.5em 0;
  letter-spacing: 0.1em;
  text-align: justify;
}

strong {
  font-weight: bold;
  color: #0F4C81;
}

ul, ol {
  padding-left: 2em;
  margin: 1.5em 0;
}

li {
  margin: 0.5em 0;
  line-height: 1.75;
}

blockquote {
  margin: 1.5em 0;
  padding: 12px 16px;
  border-left: 4px solid #0F4C81;
  background-color: rgba(15, 76, 129, 0.05);
  color: #555555;
}

code {
  padding: 2px 6px;
  background-color: rgba(15, 76, 129, 0.08);
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  color: #c7254e;
}

pre {
  margin: 1.5em 0;
  padding: 16px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow-x: auto;
}

pre code {
  padding: 0;
  background-color: transparent;
  color: #333333;
  border-radius: 0;
}

a {
  color: #0F4C81;
  text-decoration: none;
  border-bottom: 1px solid #0F4C81;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  font-size: 14px;
}

table thead {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

table th, table td {
  border: 1px solid #dfdfdf;
  padding: 8px 12px;
  text-align: left;
  line-height: 1.75;
}

img {
  max-width: 100%;
  height: auto;
  margin: 1.5em 0;
  border-radius: 4px;
}

hr {
  border: none;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  margin: 1.5em 0;
}
  `.trim();
}

/**
 * Convert inline styles to style attributes for maximum compatibility
 * TODO: Implement more sophisticated inline styling for future sprints
 */
// function inlineStyles(html: string): string {
//   // For Sprint 1, we'll keep styles in a style tag
//   // More sophisticated inline styling can be added later
//   return html;
// }

/**
 * Export to full HTML with complete document structure and inline styles
 */
export async function toFullHtml(markdown: string): Promise<string> {
  const bodyHtml = await renderToHtml(markdown);
  const styles = getInlineStyles();

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Document</title>
  <style>
${styles}
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

/**
 * Export to bare HTML without styles (clean HTML only)
 */
export async function toBareHtml(markdown: string): Promise<string> {
  return await renderToHtml(markdown, { 
    addIds: false, 
    addAnchors: false,
    highlight: false 
  });
}

/**
 * Export to compact HTML with minimal inline styles
 */
export async function toCompatHtml(markdown: string): Promise<string> {
  const bodyHtml = await renderToHtml(markdown);
  
  // Minimal styles for basic typography
  const minimalStyles = `
body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
h1, h2, h3, h4, h5, h6 { margin: 1.5em 0 0.5em 0; }
p { margin: 1em 0; }
code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
  `.trim();

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${minimalStyles}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}
