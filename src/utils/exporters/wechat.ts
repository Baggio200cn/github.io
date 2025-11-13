import { renderToHtml } from '../markdown/renderer';

/**
 * Generate inline styles specifically formatted for WeChat Official Account
 * WeChat requires all styles to be inline for proper rendering
 */
function getWeChatInlineStyles() {
  return {
    body: 'font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif; font-size: 16px; line-height: 1.75; color: #3f3f3f;',
    h1: 'font-size: 20px; font-weight: bold; color: #0F4C81; margin: 2em 0 0.75em 0; padding-bottom: 8px; border-bottom: 2px solid #0F4C81; line-height: 1.2;',
    h2: 'font-size: 18px; font-weight: bold; color: #0F4C81; margin: 2em 0 0.75em 0; padding-left: 8px; border-left: 3px solid #0F4C81; line-height: 1.2;',
    h3: 'font-size: 16px; font-weight: bold; color: #0F4C81; margin: 2em 0 0.75em 0; line-height: 1.2;',
    h4: 'font-size: 15px; font-weight: bold; color: #0F4C81; margin: 2em 0 0.75em 0; line-height: 1.2;',
    h5: 'font-size: 14px; font-weight: bold; color: #0F4C81; margin: 2em 0 0.75em 0; line-height: 1.2;',
    h6: 'font-size: 14px; font-weight: bold; color: #0F4C81; margin: 2em 0 0.75em 0; line-height: 1.2;',
    p: 'margin: 1.5em 0; letter-spacing: 0.05em; line-height: 1.75;',
    strong: 'font-weight: bold; color: #0F4C81;',
    em: 'font-style: italic;',
    ul: 'padding-left: 2em; margin: 1.5em 0;',
    ol: 'padding-left: 2em; margin: 1.5em 0;',
    li: 'margin: 0.5em 0; line-height: 1.75;',
    blockquote: 'margin: 1.5em 0; padding: 12px 16px; border-left: 4px solid #0F4C81; background-color: rgba(15, 76, 129, 0.05); color: #555555;',
    code: 'padding: 2px 6px; background-color: rgba(15, 76, 129, 0.08); border-radius: 3px; font-family: Consolas, Monaco, "Courier New", monospace; font-size: 0.9em; color: #c7254e;',
    pre: 'margin: 1.5em 0; padding: 16px; background-color: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 4px; overflow-x: auto;',
    a: 'color: #0F4C81; text-decoration: none; border-bottom: 1px solid #0F4C81;',
    img: 'max-width: 100%; height: auto; margin: 1.5em 0; border-radius: 4px; display: block;',
    table: 'width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 14px;',
    th: 'border: 1px solid #dfdfdf; padding: 8px 12px; text-align: left; background-color: rgba(0, 0, 0, 0.05); font-weight: bold;',
    td: 'border: 1px solid #dfdfdf; padding: 8px 12px; text-align: left;',
    hr: 'border: none; border-top: 2px solid rgba(0, 0, 0, 0.1); margin: 1.5em 0;',
  };
}

/**
 * Apply inline styles to HTML elements for WeChat compatibility
 */
function applyInlineStyles(html: string): string {
  const styles = getWeChatInlineStyles();
  
  // Apply inline styles to common elements
  let styledHtml = html;
  
  // Wrap content in a div with base styles
  styledHtml = `<section style="${styles.body}">${styledHtml}</section>`;
  
  // Replace element tags with styled versions
  const styleMap: Record<string, string> = {
    '<h1': `<h1 style="${styles.h1}"`,
    '<h2': `<h2 style="${styles.h2}"`,
    '<h3': `<h3 style="${styles.h3}"`,
    '<h4': `<h4 style="${styles.h4}"`,
    '<h5': `<h5 style="${styles.h5}"`,
    '<h6': `<h6 style="${styles.h6}"`,
    '<p': `<p style="${styles.p}"`,
    '<strong': `<strong style="${styles.strong}"`,
    '<em': `<em style="${styles.em}"`,
    '<ul': `<ul style="${styles.ul}"`,
    '<ol': `<ol style="${styles.ol}"`,
    '<li': `<li style="${styles.li}"`,
    '<blockquote': `<blockquote style="${styles.blockquote}"`,
    '<code': `<code style="${styles.code}"`,
    '<pre': `<pre style="${styles.pre}"`,
    '<a ': `<a style="${styles.a}" `,
    '<img': `<img style="${styles.img}"`,
    '<table': `<table style="${styles.table}"`,
    '<th': `<th style="${styles.th}"`,
    '<td': `<td style="${styles.td}"`,
    '<hr': `<hr style="${styles.hr}"`,
  };

  for (const [tag, styledTag] of Object.entries(styleMap)) {
    styledHtml = styledHtml.replace(new RegExp(tag, 'g'), styledTag);
  }

  return styledHtml;
}

/**
 * Convert markdown to WeChat-compatible HTML with inline styles
 * WeChat Official Account editor requires inline styles for proper formatting
 */
export async function toWeChatHtml(markdown: string): Promise<string> {
  try {
    // Render to HTML without IDs/anchors for cleaner WeChat paste
    const html = await renderToHtml(markdown, { 
      addIds: false, 
      addAnchors: false,
      highlight: false  // WeChat doesn't support syntax highlighting well
    });
    
    // Apply inline styles for WeChat compatibility
    const styledHtml = applyInlineStyles(html);
    
    return styledHtml;
  } catch (error) {
    console.error('Error converting to WeChat format:', error);
    throw error;
  }
}
