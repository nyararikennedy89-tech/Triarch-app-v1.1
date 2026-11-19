// Build-time prerendering. Runs after `vite build`.
// Writes a real HTML file for the homepage and every standalone page so that
// search engines and AI crawlers (which often don't run JavaScript) receive
// the full text. The React app replaces this markup when it loads.
// Also generates sitemap.xml, llms.txt and 404.html.

import fs from 'node:fs';
import path from 'node:path';
import {
  SEO_PAGES,
  SITE_URL,
  NAV_GROUPS,
  SeoPage,
  absUrl,
  renderArticleHtml,
} from '../src/seo/pages';
import { escapeHtml } from '../src/seo/markdown';
import { siteConfig } from '../src/config/siteConfig';
import { SERVICES_DATA } from '../src/data/services';

const DIST = path.resolve(process.argv[2] || 'dist');
const templatePath = path.join(DIST, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const attr = (s: string) => escapeHtml(s);

function setMeta(html: string, selector: RegExp, value: string): string {
  if (!selector.test(html)) throw new Error(`prerender: tag not found: ${selector}`);
  return html.replace(selector, (_m, a: string, b: string) => `${a}${attr(value)}${b}`);
}

function headFor(html: string, page: SeoPage): string {
  const url = absUrl(page.path);
  let h = html;
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(page.title)}</title>`);
  h = setMeta(h, /(<meta name="description" content=")[^"]*(")/, page.description);
  h = setMeta(h, /(<link rel="canonical" href=")[^"]*(")/, url);
  h = h.replace(/(<link rel="alternate" hreflang="[^"]+" href=")[^"]*(")/g, `$1${url}$2`);
  h = setMeta(h, /(<meta property="og:url" content=")[^"]*(")/, url);
  h = setMeta(h, /(<meta property="og:title" content=")[^"]*(")/, page.title);
  h = setMeta(h, /(<meta property="og:description" content=")[^"]*(")/, page.description);
  h = setMeta(h, /(<meta name="twitter:title" content=")[^"]*(")/, page.title);
  h = setMeta(h, /(<meta name="twitter:description" content=")[^"]*(")/, page.description);
  if (page.kind === 'guide') h = h.replace(/(<meta property="og:type" content=")[^"]*(")/, '$1article$2');
  if (page.image && page.image.startsWith('/')) {
    const img = absUrl(page.image);
    h = h.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`);
    h = h.replace(/(<meta property="og:image:secure_url" content=")[^"]*(")/, `$1${img}$2`);
    h = h.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${img}$2`);
  }
  // Keep the Organization/WebSite graph, drop homepage-only FAQ and breadcrumbs
  // (FAQ markup must match visible content), then add this page's own data.
  h = h.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    (_m, json: string) => {
      const data = JSON.parse(json);
      if (Array.isArray(data['@graph'])) {
        data['@graph'] = data['@graph'].filter(
          (n: { '@type'?: string }) => n['@type'] !== 'FAQPage' && n['@type'] !== 'BreadcrumbList',
        );
      }
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>\n    <script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`;
    },
  );
  return h;
}

function staticNav(): string {
  const links = [
    ['Home', '/'],
    ['Projects', '/#projects'],
    ['Services', '/#services'],
    ['Cost Estimator', '/#estimator'],
    ['Guides', '/#resources'],
    ['FAQ', '/#faq'],
    ['Contact', '/#contact'],
  ];
  return `<nav class="seo-static-nav" aria-label="Main"><strong>Triarch Ventures</strong>${links
    .map(([n, h]) => `<a href="${h}">${n}</a>`)
    .join('')}</nav>`;
}

function staticFooter(): string {
  const groups: [string, { title: string; path: string }[]][] = [
    ['Services', NAV_GROUPS.services()],
    ['Offices', NAV_GROUPS.locations()],
    ['Projects', NAV_GROUPS.projects()],
    ['Guides', NAV_GROUPS.guides()],
  ];
  return `<footer class="seo-static-home">${groups
    .map(
      ([h, ls]) =>
        `<h2>${h}</h2><ul>${ls.map((l) => `<li><a href="${l.path}">${escapeHtml(l.title)}</a></li>`).join('')}</ul>`,
    )
    .join('')}<p>${escapeHtml(siteConfig.brand.legalName)} · ${escapeHtml(
    siteConfig.contact.primaryPhone,
  )} · <a href="mailto:${siteConfig.contact.primaryEmail}">${siteConfig.contact.primaryEmail}</a></p></footer>`;
}

function inject(html: string, body: string): string {
  if (!html.includes('<div id="root"></div>')) throw new Error('prerender: empty #root not found');
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function write(rel: string, content: string) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// ---------- Homepage ----------
const faq: { q: string; a: string }[] = [];
{
  const m = template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (m) {
    const data = JSON.parse(m[1]);
    for (const node of data['@graph'] || []) {
      if (node['@type'] === 'FAQPage') {
        for (const q of node.mainEntity || []) faq.push({ q: q.name, a: q.acceptedAnswer?.text || '' });
      }
    }
  }
}
const offices = Object.values(siteConfig.offices);
const homeBody = `${staticNav()}
<main class="seo-static-home">
<h1>Triarch Ventures: Architects &amp; Engineers in Kenya</h1>
<p>${escapeHtml(siteConfig.brand.shortDescription)} Established ${siteConfig.brand.establishedYear}.</p>
<h2>Services</h2>
<ul>${SERVICES_DATA.map(
  (s) => `<li><a href="/services/${s.id}">${escapeHtml(s.title)}</a>: ${escapeHtml(s.shortDesc)}</li>`,
).join('')}</ul>
<h2>Selected projects</h2>
<ul>${NAV_GROUPS.projects()
  .map((p) => `<li><a href="${p.path}">${escapeHtml(p.title)}</a>, ${escapeHtml(p.note || '')}</li>`)
  .join('')}</ul>
<h2>Offices</h2>
<ul>${offices
  .map((o) => `<li>${escapeHtml(o.city)}: ${escapeHtml(o.address)}. ${escapeHtml(o.hours)}.</li>`)
  .join('')}</ul>
<h2>Guides</h2>
<ul>${NAV_GROUPS.guides()
  .map((g) => `<li><a href="${g.path}">${escapeHtml(g.title)}</a></li>`)
  .join('')}</ul>
${
  faq.length
    ? `<h2>Frequently asked questions</h2>${faq
        .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
        .join('')}`
    : ''
}
<h2>Contact</h2>
<p>Phone / WhatsApp: ${escapeHtml(siteConfig.contact.primaryPhone)} · Email: <a href="mailto:${
  siteConfig.contact.inquiriesEmail
}">${siteConfig.contact.inquiriesEmail}</a></p>
</main>`;
write('index.html', inject(template, homeBody));

// ---------- Standalone pages ----------
for (const page of SEO_PAGES) {
  const body = `${staticNav()}<main class="seo-page"><article class="seo-article">${renderArticleHtml(
    page,
  )}</article></main>${staticFooter()}`;
  write(path.join(page.path.slice(1), 'index.html'), inject(headFor(template, page), body));
}

// ---------- 404 ----------
{
  let h = template.replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Triarch Ventures</title>');
  h = h.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2');
  h = h.replace(/\s*<link rel="canonical"[^>]*>/, '');
  const body = `${staticNav()}<main class="seo-static-home"><h1>Page not found</h1><p>The page you were looking for doesn't exist. <a href="/">Go to the homepage</a>.</p></main>${staticFooter()}`;
  write('404.html', inject(h, body));
}

// ---------- sitemap.xml ----------
{
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: today, priority: '1.0', images: ['/oleleshwa-shell-sunset.jpg'] },
    ...SEO_PAGES.map((p) => ({
      loc: absUrl(p.path),
      lastmod: p.lastmod,
      priority: p.kind === 'service' || p.kind === 'location' ? '0.8' : '0.7',
      images: p.image && p.image.startsWith('/') ? [p.image] : [],
    })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>${u.images
      .map((i) => `\n    <image:image><image:loc>${absUrl(i)}</image:loc></image:image>`)
      .join('')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;
  write('sitemap.xml', xml);
}

// ---------- llms.txt ----------
{
  const sec = (title: string, pages: SeoPage[]) =>
    `## ${title}\n\n${pages.map((p) => `- [${p.h1}](${absUrl(p.path)}): ${p.description}`).join('\n')}\n`;
  const txt = `# Triarch Ventures

> ${siteConfig.brand.shortDescription} Based in Kenya, established ${siteConfig.brand.establishedYear}. Offices in Nairobi, Kiambu County and Nyeri County (all by appointment).

- Website: ${SITE_URL}/
- Phone / WhatsApp: ${siteConfig.contact.primaryPhone}
- Email: ${siteConfig.contact.inquiriesEmail}
${offices.map((o) => `- ${o.city} office: ${o.address} (${o.hours})`).join('\n')}

${sec('Services', SEO_PAGES.filter((p) => p.kind === 'service'))}
${sec('Projects', SEO_PAGES.filter((p) => p.kind === 'project'))}
${sec('Offices', SEO_PAGES.filter((p) => p.kind === 'location'))}
${sec('Guides', SEO_PAGES.filter((p) => p.kind === 'guide'))}`;
  write('llms.txt', txt);
}

console.log(`prerender: wrote homepage, ${SEO_PAGES.length} pages, 404.html, sitemap.xml, llms.txt`);
