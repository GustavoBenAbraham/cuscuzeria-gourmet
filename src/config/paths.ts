/** Resolve public assets for both local hosting and project-based GitHub Pages. */
export function assetPath(path: string, base = import.meta.env?.BASE_URL ?? '/') {
  return path.startsWith('/') && !path.startsWith('//') ? base.replace(/\/$/, '') + path : path;
}
