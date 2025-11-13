// 将 HTML 写入剪贴板，带纯文本兜底
export async function copyHtmlToClipboard(html: string, plainFallback?: string) {
  const hasWrite = typeof (navigator as any).clipboard?.write === 'function';
  const hasWriteText = typeof (navigator as any).clipboard?.writeText === 'function';
  const hasClipboardItem = typeof (window as any).ClipboardItem !== 'undefined';

  if (hasWrite && hasClipboardItem) {
    const blobHtml = new Blob([html], { type: 'text/html' });
    const blobText = new Blob(
      [plainFallback ?? html.replace(/<[^>]+>/g, '')],
      { type: 'text/plain' }
    );
    const ClipboardItemCtor = (window as any).ClipboardItem as any;
    const item = new ClipboardItemCtor({ 'text/html': blobHtml, 'text/plain': blobText });
    await (navigator as any).clipboard.write([item]);
  } else if (hasWriteText) {
    // 退化：仅能写纯文本
    await (navigator as any).clipboard.writeText(plainFallback ?? html);
  } else {
    throw new Error('当前环境不支持 Clipboard API');
  }
}

export async function copyTextToClipboard(text: string) {
  const hasWriteText = typeof (navigator as any).clipboard?.writeText === 'function';
  if (!hasWriteText) {
    throw new Error('当前环境不支持 Clipboard API');
  }
  await (navigator as any).clipboard.writeText(text);
}
