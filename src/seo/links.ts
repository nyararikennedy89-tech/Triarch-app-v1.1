// Section links like "#projects" only work on the homepage. On standalone
// pages they must point back to the homepage section ("/#projects").
export function homeHref(href: string): string {
  if (!href.startsWith('#')) return href;
  if (typeof window === 'undefined' || window.location.pathname === '/') return href;
  return `/${href}`;
}
