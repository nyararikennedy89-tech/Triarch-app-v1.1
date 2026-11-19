// Minimal Markdown → HTML renderer for the site's own article content.
// Supports: ### / #### headings, numbered and bulleted (• - *) lists,
// **bold**, and paragraphs. Input is trusted (authored in src/data).

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(s: string): string {
  return escapeHtml(s.trim()).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r/g, '').split('\n');
  const out: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(' '))}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      continue;
    }
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = Math.min(h[1].length, 4) === 2 ? 2 : h[1].length === 3 ? 2 : 3;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    const ul = line.match(/^[•\-*]\s+(.*)$/);
    if (ol || ul) {
      flushPara();
      const kind = ol ? 'ol' : 'ul';
      // Bullets directly under a numbered item stay inside that item.
      if (ul && list === 'ol') {
        out.push(`<ul><li>${inline(ul[1])}</li></ul>`);
        continue;
      }
      if (list !== kind) {
        closeList();
        out.push(`<${kind}>`);
        list = kind;
      }
      out.push(`<li>${inline((ol || ul)![1])}</li>`);
      continue;
    }
    closeList();
    para.push(line);
  }
  flushPara();
  closeList();
  // Merge consecutive nested <ul> blocks created under the same numbered item.
  return out.join('\n').replace(/<\/ul>\n<ul>/g, '\n');
}
