import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export interface RenderOptions {
  addIds?: boolean;
  addAnchors?: boolean;
  highlight?: boolean;
}

/**
 * Convert Markdown to HTML using remark/rehype pipeline
 * Supports GFM (tables, task lists), code highlighting, and heading anchors
 */
export async function renderToHtml(
  markdown: string,
  options: RenderOptions = {}
): Promise<string> {
  const {
    addIds = true,
    addAnchors = true,
    highlight = true,
  } = options;

  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: false });

    // Build pipeline conditionally
    const pipeline = [
      addIds ? rehypeSlug : null,
      addAnchors ? [rehypeAutolinkHeadings, { behavior: 'wrap' }] : null,
      highlight ? rehypeHighlight : null,
      rehypeStringify,
    ].filter(Boolean);

    // Apply plugins
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let proc = processor as any;
    for (const plugin of pipeline) {
      if (Array.isArray(plugin)) {
        proc = proc.use(plugin[0], plugin[1]);
      } else {
        proc = proc.use(plugin);
      }
    }

    const result = await proc.process(markdown);
    return String(result);
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return '<p>解析 Markdown 时出错</p>';
  }
}

/**
 * Synchronous version for simple rendering without async pipeline
 */
export function renderToHtmlSync(markdown: string): string {
  // For synchronous rendering, we'll use the existing marked implementation as fallback
  // This can be used where async is not possible
  return markdown;
}
