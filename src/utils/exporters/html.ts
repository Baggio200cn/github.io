import { renderToHtml } from '../markdown/renderer';

const baseTypography = `
  article{font-family:-apple-system-font,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei",Arial,sans-serif;color:#222;line-height:1.8;font-size:16px}
  h1{font-size:28px;margin:24px 0 12px}
  h2{font-size:24px;margin:22px 0 10px}
  h3{font-size:20px;margin:20px 0 8px}
  p{margin:16px 0}
  blockquote{margin:16px 0;padding:12px 14px;border-left:4px solid #0F4C81;background:#f4f8fb;color:#555}
  pre{margin:16px 0;padding:12px;background:#f8f8f8;border:1px solid #e0e0e0;border-radius:4px;overflow:auto}
  code{background:#f1f3f5;padding:2px 6px;border-radius:3px}
  table{width:100%;border-collapse:collapse;margin:16px 0}
  th,td{border:1px solid #e5e5e5;padding:8px 12px;text-align:left}
  img{max-width:100%;height:auto;margin:16px 0;display:block}
`;

export async function toFullHtml(md: string) {
  const inner = await renderToHtml(md, { addIds: true, addAnchors: true, highlight: true });
  return `<article><style>${baseTypography}</style>${inner}</article>`;
}

export async function toBareHtml(md: string) {
  // 无样式：只返回结构化 HTML 片段
  return await renderToHtml(md, { addIds: true, addAnchors: true, highlight: false });
}

export function toCompatHtml(md: string) {
  // 兼容模式留作后续拓展
  return toFullHtml(md);
}
