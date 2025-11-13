import { renderToHtml } from '../markdown/renderer';

/**
 * 为公众号粘贴生成内联样式 HTML（尽量使用被白名单支持的属性与标签）
 */
function getWeChatInlineStyles() {
  return {
    body:
      'font-family:-apple-system-font,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei",Arial,sans-serif;font-size:16px;line-height:1.8;color:#222;margin:0;padding:0;',
    h1: 'font-size:22px;font-weight:700;color:#0F4C81;margin:24px 0 12px;border-bottom:2px solid #0F4C81;padding-bottom:6px;',
    h2: 'font-size:20px;font-weight:700;color:#0F4C81;margin:22px 0 10px;padding-left:8px;border-left:3px solid #0F4C81;',
    h3: 'font-size:18px;font-weight:700;color:#0F4C81;margin:20px 0 8px;',
    h4: 'font-size:16px;font-weight:700;color:#0F4C81;margin:18px 0 8px;',
    h5: 'font-size:15px;font-weight:700;color:#0F4C81;margin:16px 0 6px;',
    h6: 'font-size:14px;font-weight:700;color:#0F4C81;margin:14px 0 6px;',
    p: 'margin:16px 0;line-height:1.8;letter-spacing:.02em;',
    strong: 'font-weight:700;color:#0F4C81;',
    em: 'font-style:italic;',
    ul: 'padding-left:24px;margin:14px 0;',
    ol: 'padding-left:24px;margin:14px 0;',
    li: 'margin:6px 0;line-height:1.8;',
    blockquote:
      'margin:16px 0;padding:12px 14px;border-left:4px solid #0F4C81;background:#f4f8fb;color:#555;',
    code:
      'padding:2px 6px;background:#f1f3f5;border-radius:3px;font-family:Consolas,Monaco,"Courier New",monospace;font-size:.9em;color:#c7254e;',
    pre:
      'margin:16px 0;padding:12px;background:#f8f8f8;border:1px solid #e0e0e0;border-radius:4px;overflow-x:auto;',
    a: 'color:#0F4C81;text-decoration:none;border-bottom:1px solid #0F4C81;',
    img: 'max-width:100%;height:auto;margin:16px 0;border-radius:4px;display:block;',
    table: 'width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;',
    th: 'border:1px solid #dfdfdf;padding:8px 12px;text-align:left;background:#f6f6f6;font-weight:700;',
    td: 'border:1px solid #dfdfdf;padding:8px 12px;text-align:left;',
    hr: 'border:none;border-top:2px solid rgba(0,0,0,.08);margin:16px 0;',
  };
}

function applyInlineStyles(html: string): string {
  const s = getWeChatInlineStyles();
  let out = html;

  // 外层容器：尽量使用 div 而非 section
  out = `<div style="${s.body}">${out}</div>`;

  const map: Record<string, string> = {
    '<h1': `<h1 style="${s.h1}"`,
    '<h2': `<h2 style="${s.h2}"`,
    '<h3': `<h3 style="${s.h3}"`,
    '<h4': `<h4 style="${s.h4}"`,
    '<h5': `<h5 style="${s.h5}"`,
    '<h6': `<h6 style="${s.h6}"`,
    '<p': `<p style="${s.p}"`,
    '<strong': `<strong style="${s.strong}"`,
    '<em': `<em style="${s.em}"`,
    '<ul': `<ul style="${s.ul}"`,
    '<ol': `<ol style="${s.ol}"`,
    '<li': `<li style="${s.li}"`,
    '<blockquote': `<blockquote style="${s.blockquote}"`,
    '<code': `<code style="${s.code}"`,
    '<pre': `<pre style="${s.pre}"`,
    '<a ': `<a style="${s.a}" `,
    '<img': `<img style="${s.img}"`,
    '<table': `<table style="${s.table}"`,
    '<th': `<th style="${s.th}"`,
    '<td': `<td style="${s.td}"`,
    '<hr': `<hr style="${s.hr}"`,
  };

  for (const [raw, styled] of Object.entries(map)) {
    out = out.replace(new RegExp(raw, 'g'), styled);
  }
  return out;
}

/** Markdown -> 公众号可粘贴 HTML（带内联样式） */
export async function toWeChatHtml(markdown: string): Promise<string> {
  const html = await renderToHtml(markdown, {
    addIds: false,
    addAnchors: false,
    highlight: false,
  });
  return applyInlineStyles(html);
}
