// Single source of truth for the site's standalone, indexable pages
// (services, locations, projects, guides). Used by the React app at runtime
// (ContentPage) and by scripts/prerender.ts at build time, so the HTML that
// search engines and AI crawlers receive is identical to what visitors see.

import { SERVICES_DATA } from '../data/services';
import { PROJECTS_DATA } from '../data/projects';
import { BLOG_POSTS } from '../data/blog';
import { siteConfig } from '../config/siteConfig';
import { escapeHtml, markdownToHtml } from './markdown';

export const SITE_URL = 'https://www.triarchventures.co.ke';
export const ORG_ID = `${SITE_URL}/#organization`;
const BRAND = 'Triarch Ventures';

export interface Crumb {
  name: string;
  path: string;
}

export interface LinkItem {
  title: string;
  path: string;
  note?: string;
}

export interface SeoPage {
  path: string; // e.g. /services/architecture
  kind: 'service' | 'location' | 'project' | 'guide';
  title: string; // <title>, kept under ~60 characters
  description: string; // meta description, kept under ~160 characters
  eyebrow: string;
  h1: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  bodyHtml: string;
  related: { heading: string; links: LinkItem[] }[];
  breadcrumb: Crumb[];
  jsonLd: Record<string, unknown>;
  lastmod: string; // YYYY-MM-DD
}

const today = new Date().toISOString().slice(0, 10);

export function absUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function clip(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const list = (items: string[]) =>
  `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
const para = (t: string) => `<p>${escapeHtml(t)}</p>`;
const h2 = (t: string) => `<h2>${escapeHtml(t)}</h2>`;

function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

// ---------- Services ----------
const serviceTitle = (t: string) => `${t} Services in Kenya | ${BRAND}`;
export const servicePath = (id: string) => `/services/${id}`;

// ---------- Projects ----------
export const projectPath = (p: { title: string }) => `/projects/${slugify(p.title)}`;

// ---------- Guides ----------
export const guidePath = (slug: string) => `/resources/${slug}`;
const GUIDE_TITLES: Record<string, string> = {
  'construction-cost-breakdown-kenya-2025': 'Cost to Build in Kenya (2025 Guide)',
  'building-approval-process-guide': 'Building Approval Process in Kenya',
  'hidden-roof-vs-pitched-roof-comparison': 'Hidden Roof vs Pitched Roof in Kenya',
  'choosing-an-architect-guide': 'How to Choose an Architect in Kenya',
  'mastering-construction-budget-guide': 'Construction Budget & Contingency Guide',
};

// ---------- Locations ----------
export const LOCATIONS = [
  { key: 'Nairobi', slug: 'nairobi', name: 'Nairobi', county: 'Nairobi County', match: ['Nairobi'] },
  { key: 'Kiambu', slug: 'kiambu', name: 'Kiambu County', county: 'Kiambu County', match: ['Kiambu', 'Thika', 'Ruiru'] },
  { key: 'Nyeri', slug: 'nyeri', name: 'Nyeri County', county: 'Nyeri County', match: ['Nyeri'] },
] as const;
export const locationPath = (slug: string) => `/locations/${slug}`;

const serviceLinks = (): LinkItem[] =>
  SERVICES_DATA.map((s) => ({ title: s.title, path: servicePath(s.id), note: s.shortDesc }));
const projectLinks = (filter?: (p: (typeof PROJECTS_DATA)[number]) => boolean): LinkItem[] =>
  PROJECTS_DATA.filter(filter || (() => true)).map((p) => ({
    title: p.title,
    path: projectPath(p),
    note: p.location,
  }));
const guideLinks = (): LinkItem[] =>
  BLOG_POSTS.map((b) => ({ title: GUIDE_TITLES[b.slug] || b.title, path: guidePath(b.slug), note: b.summary }));
const locationLinks = (): LinkItem[] =>
  LOCATIONS.map((l) => ({ title: `${BRAND} in ${l.name}`, path: locationPath(l.slug) }));

function parseDate(d: string): string {
  const t = Date.parse(d);
  return Number.isNaN(t) ? today : new Date(t).toISOString().slice(0, 10);
}

function buildPages(): SeoPage[] {
  const pages: SeoPage[] = [];

  for (const s of SERVICES_DATA) {
    const path = servicePath(s.id);
    const breadcrumb = [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/#services' },
      { name: s.title, path },
    ];
    pages.push({
      path,
      kind: 'service',
      title: serviceTitle(s.title),
      description: clip(`${s.title} in Kenya by ${BRAND}: ${s.shortDesc}`),
      eyebrow: 'Service',
      h1: `${s.title} Services in Kenya`,
      intro: s.fullDesc,
      bodyHtml: [
        h2('What we deliver'),
        list(s.deliverables),
        h2('How we work'),
        para(s.methodology),
        h2('Tools and software'),
        list(s.technologies),
        h2('Where we work'),
        para(
          `${BRAND} takes on ${s.title.toLowerCase()} commissions across Kenya, with offices in Nairobi, Kiambu County and Nyeri County. All offices are open by appointment.`,
        ),
      ].join('\n'),
      related: [
        { heading: 'Other services', links: serviceLinks().filter((l) => l.path !== path) },
        { heading: 'Selected projects', links: projectLinks() },
      ],
      breadcrumb,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${absUrl(path)}#service`,
            name: `${s.title} Services`,
            serviceType: s.title,
            description: s.fullDesc,
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'Kenya' },
            url: absUrl(path),
          },
          breadcrumbLd(breadcrumb),
        ],
      },
      lastmod: today,
    });
  }

  for (const p of PROJECTS_DATA) {
    const path = projectPath(p);
    const breadcrumb = [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/#projects' },
      { name: p.title, path },
    ];
    const facts = [
      `Location: ${p.location}`,
      `Category: ${p.category}`,
      `Size: ${p.area}`,
      `Year: ${p.year}`,
      ...(p.client && p.client !== 'Confidential' ? [`Client: ${p.client}`] : []),
    ];
    const localImages = Array.from(new Set([p.heroImage, ...p.galleryImages])).filter((i) => i.startsWith('/'));
    pages.push({
      path,
      kind: 'project',
      title: clip(`${p.title} | ${BRAND}`, 65),
      description: clip(`${p.title}, ${p.location}. ${p.overview}`),
      eyebrow: `Project · ${p.category}`,
      h1: p.title,
      intro: p.overview,
      image: p.heroImage,
      imageAlt: `${p.title}, ${p.location}`,
      bodyHtml: [
        h2('Project facts'),
        list(facts),
        h2('Client brief'),
        para(p.clientBrief),
        h2('Design challenge'),
        para(p.designChallenge),
        h2('Design solution'),
        para(p.designSolution),
        h2('Services provided'),
        list(p.servicesProvided),
        ...(p.stats?.length ? [h2('Key figures'), list(p.stats.map((s) => `${s.label}: ${s.value}`))] : []),
        ...(localImages.length > 1
          ? [
              `<div class="seo-gallery">${localImages
                .slice(1)
                .map(
                  (src) =>
                    `<img src="${escapeHtml(src)}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async" />`,
                )
                .join('')}</div>`,
            ]
          : []),
      ].join('\n'),
      related: [
        { heading: 'More projects', links: projectLinks((x) => x.id !== p.id) },
        { heading: 'Services', links: serviceLinks() },
      ],
      breadcrumb,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CreativeWork',
            '@id': `${absUrl(path)}#project`,
            name: p.title,
            description: p.overview,
            image: localImages.map(absUrl),
            locationCreated: { '@type': 'Place', name: p.location },
            dateCreated: p.year,
            creator: { '@id': ORG_ID },
            url: absUrl(path),
          },
          breadcrumbLd(breadcrumb),
        ],
      },
      lastmod: today,
    });
  }

  for (const b of BLOG_POSTS) {
    const path = guidePath(b.slug);
    const short = GUIDE_TITLES[b.slug] || b.title;
    const breadcrumb = [
      { name: 'Home', path: '/' },
      { name: 'Resources', path: '/#resources' },
      { name: short, path },
    ];
    const published = parseDate(b.date);
    pages.push({
      path,
      kind: 'guide',
      title: clip(`${short} | ${BRAND}`, 65),
      description: clip(b.summary),
      eyebrow: `Guide · ${b.category} · ${b.readTime}`,
      h1: b.title,
      intro: b.summary,
      bodyHtml: markdownToHtml(b.content),
      related: [
        { heading: 'More guides', links: guideLinks().filter((l) => l.path !== path) },
        { heading: 'Services', links: serviceLinks() },
      ],
      breadcrumb,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${absUrl(path)}#article`,
            headline: b.title,
            description: b.summary,
            datePublished: published,
            dateModified: published,
            author: { '@id': ORG_ID },
            publisher: { '@id': ORG_ID },
            mainEntityOfPage: absUrl(path),
            articleSection: b.category,
            inLanguage: 'en-KE',
          },
          breadcrumbLd(breadcrumb),
        ],
      },
      lastmod: published,
    });
  }

  for (const l of LOCATIONS) {
    const office = siteConfig.offices[l.key];
    const path = locationPath(l.slug);
    const breadcrumb = [
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/#contact' },
      { name: l.name, path },
    ];
    const local = projectLinks((p) => l.match.some((m) => p.location.includes(m) || p.title.includes(m)));
    const isNairobi = l.slug === 'nairobi';
    const h1Text = isNairobi ? 'Architects & Engineers in Nairobi' : `Architects & Engineers in ${l.name}`;
    pages.push({
      path,
      kind: 'location',
      title: `${h1Text} | ${BRAND}`.length <= 62 ? `${h1Text} | ${BRAND}` : `Architects in ${l.name} | ${BRAND}`,
      description: clip(
        `${BRAND} offers architecture, interior design, structural & MEP engineering and project management in ${l.name}. Office: ${office.address}, by appointment.`,
      ),
      eyebrow: isNairobi ? 'Head office' : 'Branch office',
      h1: h1Text,
      intro: `${BRAND} is a multidisciplinary architecture and engineering practice serving clients in ${l.name}${
        isNairobi ? ' and across Kenya' : ''
      }. Meetings at our ${l.name} office are by appointment.`,
      bodyHtml: [
        h2(`Our ${l.name} office`),
        list([
          `Address: ${office.address}${isNairobi ? ', Nairobi' : ''}`,
          `Hours: ${office.hours}`,
          `Phone: ${office.phone}`,
          `Email: ${office.email}`,
        ]),
        h2(`Services in ${l.name}`),
        `<ul>${SERVICES_DATA.map(
          (s) => `<li><a href="${servicePath(s.id)}">${escapeHtml(s.title)}</a>: ${escapeHtml(s.shortDesc)}</li>`,
        ).join('')}</ul>`,
        h2('Book a meeting'),
        para(
          `Call or WhatsApp ${siteConfig.contact.primaryPhone}, or email ${office.email}, to arrange a site visit or a meeting at our ${l.name} office.`,
        ),
      ].join('\n'),
      related: [
        ...(local.length ? [{ heading: `Projects in ${l.name}`, links: local }] : []),
        { heading: 'Other offices', links: locationLinks().filter((x) => x.path !== path) },
        { heading: 'Guides', links: guideLinks() },
      ],
      breadcrumb,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfessionalService',
            '@id': `${absUrl(path)}#office`,
            name: `${BRAND}, ${l.name} office`,
            parentOrganization: { '@id': ORG_ID },
            url: absUrl(path),
            telephone: siteConfig.contact.whatsAppPhone,
            email: office.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: office.address,
              addressRegion: l.county,
              addressCountry: 'KE',
            },
            areaServed: { '@type': 'AdministrativeArea', name: l.county },
          },
          breadcrumbLd(breadcrumb),
        ],
      },
      lastmod: today,
    });
  }

  return pages;
}

export const SEO_PAGES: SeoPage[] = buildPages();

export function findPage(pathname: string): SeoPage | undefined {
  const p = pathname.replace(/\/+$/, '') || '/';
  return SEO_PAGES.find((x) => x.path === p);
}

export const NAV_GROUPS = {
  services: serviceLinks,
  projects: () => projectLinks(),
  guides: guideLinks,
  locations: locationLinks,
};

// ---------- Shared HTML (used by React and by the prerenderer) ----------

export function renderArticleHtml(page: SeoPage): string {
  const crumbs = page.breadcrumb
    .map((c, i) =>
      i === page.breadcrumb.length - 1
        ? `<span aria-current="page">${escapeHtml(c.name)}</span>`
        : `<a href="${c.path}">${escapeHtml(c.name)}</a>`,
    )
    .join(' <span aria-hidden="true">/</span> ');
  const related = page.related
    .map(
      (g) =>
        `<section class="seo-related"><h2>${escapeHtml(g.heading)}</h2><ul>${g.links
          .map(
            (l) =>
              `<li><a href="${l.path}">${escapeHtml(l.title)}</a>${
                l.note ? `<span>${escapeHtml(clip(l.note, 120))}</span>` : ''
              }</li>`,
          )
          .join('')}</ul></section>`,
    )
    .join('\n');
  return `<nav class="seo-crumbs" aria-label="Breadcrumb">${crumbs}</nav>
<header class="seo-header">
<p class="seo-eyebrow">${escapeHtml(page.eyebrow)}</p>
<h1>${escapeHtml(page.h1)}</h1>
<p class="seo-intro">${escapeHtml(page.intro)}</p>
</header>
${
  page.image
    ? `<img class="seo-hero" src="${escapeHtml(page.image)}" alt="${escapeHtml(page.imageAlt || page.h1)}" width="1600" height="900" fetchpriority="high" />`
    : ''
}
<div class="seo-body">
${page.bodyHtml}
</div>
<aside class="seo-cta"><h2>Planning a project?</h2><p>Tell us about your site and brief. Call or WhatsApp ${escapeHtml(
    siteConfig.contact.primaryPhone,
  )} or email <a href="mailto:${siteConfig.contact.inquiriesEmail}">${siteConfig.contact.inquiriesEmail}</a>.</p><a class="seo-cta-link" href="/#contact">Start your project</a></aside>
${related}`;
}
