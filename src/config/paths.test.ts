import { describe, expect, it } from 'vitest';
import { assetPath } from './paths';
import { documentHead } from './document';
describe('GitHub Pages paths', () => {
 it('prefixes local images and preserves encoded filenames and queries', () => {
  expect(assetPath('/images/logo%20name.jpg','/cuscuzeria-gourmet-site/')).toBe('/cuscuzeria-gourmet-site/images/logo%20name.jpg');
  expect(assetPath('/favicon.svg?v=2','/cuscuzeria-gourmet-site/')).toBe('/cuscuzeria-gourmet-site/favicon.svg?v=2');
  expect(assetPath('/images/logo.jpg','/')).toBe('/images/logo.jpg');
 });
 it('leaves external and relative URLs unchanged', () => {
  for(const url of ['https://example.com/image.png','//example.com/image.png','data:image/png;base64,AA','image.png'])expect(assetPath(url,'/project/')).toBe(url);
 });
 it('prefixes favicon paths in generated HTML', () => {
  expect(documentHead('/project/')).toContain('href="/project/favicon.svg?v=logo-original"');
 });
});
