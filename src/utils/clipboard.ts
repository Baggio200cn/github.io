// 将 HTML 写入剪贴板，带纯文本兜底
export async function copyHtmlToClipboard(html: string, plainFallback?: string) {
  if (navigator.clipboard && 'write' in navigator.clipboard) {
    const blobHtml = new Blob([html], { type: 'text/html' });
    const blobText = new Blob([plainFallback ?? html.replace(/<[^>]+>/g, '')], { type: 'text/plain' });
    // @ts-expect-error: ClipboardItem 在 TS DOM lib 中可能未声明
    const item = new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText });
    await navigator.clipboard.write([item]);
  } else if (navigator.clipboard && 'writeText' in navigator.clipboard) {
    // 退化：仅能写纯文本
    await navigator.clipboard.writeText(plainFallback ?? html);
  } else {
    throw new Error('当前环境不支持 Clipboard API');
  }
}

export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard || !('writeText' in navigator.clipboard)) {
    throw new Error('当前环境不支持 Clipboard API');
  }
  await navigator.clipboard.writeText(text);
}
