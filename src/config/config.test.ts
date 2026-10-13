import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import settings from './site.json' with { type: 'json' };
import content from './content.json' with { type: 'json' };
import palette from './theme.json' with { type: 'json' };
import poems from './cordel.json' with { type: 'json' };
import { siteSchema, cordelSchema, themeSchema, catalogSchema } from './schema';

afterEach(() => { vi.doUnmock('./site.json'); vi.doUnmock('./theme.json'); vi.resetModules(); });

describe('configuration validation', () => {
 it('validates the published settings and all referenced assets', () => {
  expect(siteSchema.safeParse(settings).success).toBe(true);
  expect(cordelSchema.safeParse(poems).success).toBe(true);
  expect(themeSchema.safeParse(palette).success).toBe(true);
  for (const asset of [settings.branding.logo,settings.branding.hero,settings.branding.favicon,settings.branding.faviconPng,settings.branding.appleTouchIcon,...settings.menuPages.map(p=>p.image)]) {
   expect(existsSync('public' + decodeURIComponent(asset.split('?')[0])),asset).toBe(true);
  }
 });
 it('rejects unsafe links, duplicate routes, and contradictory limits', () => {
  for(const change of [
   {...settings,restaurant:{...settings.restaurant,deliveryUrl:'javascript:alert(1)'}},
   {...settings,routes:{...settings.routes,cart:settings.routes.menu}},
   {...settings,cart:{...settings.cart,nameMinLength:100,nameMaxLength:2}},
   {...settings,cart:{...settings.cart,maxQuantity:0}},
   {...settings,navigation:[settings.navigation[0],settings.navigation[0]]},
  ]) expect(siteSchema.safeParse(change).success).toBe(false);
 });
 it('rejects unknown artwork and duplicate cordel edition numbers', () => {
  expect(cordelSchema.safeParse([{...poems[0],kind:'unknown'}]).success).toBe(false);
  expect(cordelSchema.safeParse([poems[0],poems[0]]).success).toBe(false);
 });
 it('defines every theme token used by the active stylesheets', () => {
  const keys=new Set([...Object.keys(palette.colors).map(k=>'color-'+k),...Object.keys(palette.fonts).map(k=>'font-'+k),...Object.keys(palette.layout).map(k=>'layout-'+k)]);
  for(const path of ['src/styles/global.css','src/styles/nordeste.css']) {
   const css=readFileSync(path,'utf8');
   for(const match of css.matchAll(/var\(--((?:color|font|layout)-[^)]+)\)/g)) expect(keys.has(match[1]),match[1]).toBe(true);
  }
 });
});

describe('configuration propagation', () => {
 it('uses changed cart limits, note lengths, locale, and currency', async () => {
  vi.resetModules();
  vi.doMock('./site.json',()=>({default:{...settings,locale:'en-US',currency:'USD',cart:{...settings.cart,maxQuantity:2,itemNoteMaxLength:4}}}));
  const {sanitizeCart,money,whatsappUrl}=await import('../utils/order');
  const {products}=await import('../data/catalog');
  const p=products.find(p=>p.available && p.price!==null)!;
  expect(sanitizeCart([{productId:p.id,quantity:3,note:''}],products)).toEqual([]);
  expect(sanitizeCart([{productId:p.id,quantity:2,note:'abcdef'}],products)[0].note).toBe('abcd');
  expect(money(12.5)).toBe('$12.50');
  expect(()=>whatsappUrl({name:'Test',note:'',items:[{name:p.name,price:10,quantity:3,note:''}]})).toThrow();
 });
 it('updates contact links, copy, titles, and structured data from one business change', async () => {
  vi.resetModules();
  const name='Test <Restaurant> & Friends';
  vi.doMock('./site.json',()=>({default:{...settings,restaurant:{...settings.restaurant,name,phone:'5511987654321',instagram:'https://www.instagram.com/test_restaurant/'}}}));
  const {copy}=await import('./content');
  const {whatsappUrl}=await import('../utils/order');
  const {documentHead}=await import('./document');
  expect(copy.Layout.homeLabel).toContain(name);
  expect(copy.Layout.phoneLabel).toContain('(11) 98765-4321');
  expect(copy.Layout.instagramHandle).toContain('@test_restaurant');
  const url=whatsappUrl({name:'Customer',note:'',items:[{name:'Item',price:12,quantity:1,note:''}]});
  expect(url).toMatch(/^https:\/\/wa.me\/5511987654321\?text=/);
  expect(decodeURIComponent(url)).toContain(name);
  const head=documentHead();
  expect(head).toContain('Test &lt;Restaurant&gt; &amp; Friends');
  const schema=JSON.parse(head.match(/<script type="application\/ld\+json">(.*?)<\/script>/)![1]);
  expect(schema.name).toBe(name);
  expect(schema.telephone).toBe('+5511987654321');
 });
 it('preserves unresolved dynamic placeholders until the caller supplies values', async () => {
  const {formatText}=await import('./content');
  expect(formatText('{name} / {count}',{name:'A & B',count:0})).toBe('A & B / 0');
  expect(formatText('{missing}',{})).toBe('{missing}');
 });
 it('emits changed theme colors and rejects CSS-breaking values', async () => {
  vi.resetModules();
  vi.doMock('./theme.json',()=>({default:{...palette,colors:{...palette.colors,ifoodRed:'#ee1122'}}}));
  const {themeCss}=await import('./theme');
  expect(themeCss()).toContain('--color-ifoodRed:#ee1122;');
  expect(themeSchema.safeParse({...palette,colors:{paper:'red;display:none'}}).success).toBe(false);
 });
 it('keeps all customer-facing text entries nonempty and the default category valid', async () => {
  for(const entries of Object.values(content))for(const value of Object.values(entries))expect(value.trim().length).toBeGreaterThan(0);
  const {categories}=await import('../data/catalog');
  expect(categories.some(c=>c.id===settings.catalog.homeCategory)).toBe(true);
 });
});


it('applies feature switches and changed routes and images to rendered components', async () => {
 vi.resetModules();
 vi.doMock('./site.json',()=>({default:{...settings,branding:{...settings.branding,logo:'/favicon.svg'},routes:{...settings.routes,menu:'/menu-preview'},features:{cordel:false,originalMenu:false,floatingWhatsapp:false}}}));
 const React=await import('react');
 const {renderToStaticMarkup}=await import('react-dom/server');
 const {MemoryRouter}=await import('react-router-dom');
 const {CartProvider}=await import('../hooks/useCart');
 const {Layout}=await import('../components/layout/Layout');
 const {Home}=await import('../pages/Home');
 const render=(Component: typeof Layout | typeof Home)=>renderToStaticMarkup(React.createElement(MemoryRouter,null,React.createElement(CartProvider,null,React.createElement(Component))));
 const layout=render(Layout);
 expect(layout).toContain('href="/menu-preview"');
 expect(layout).toContain('src="/favicon.svg"');
 expect(layout).not.toContain('class="whatsapp-float"');
 const home=render(Home);
 expect(home).not.toContain('class="cordel-gallery"');
 expect(home).not.toContain('class="original-menu"');
}, 15000);

it('rejects catalog corruption without depending on product ordering', async () => {
 const {default: catalog}=await import('./catalog.json');
 expect(catalogSchema.safeParse(catalog).success).toBe(true);
 expect(catalogSchema.safeParse({...catalog,products:[catalog.products[0],catalog.products[0]]}).success).toBe(false);
 expect(catalogSchema.safeParse({...catalog,products:[{...catalog.products[0],categoryId:'missing'}]}).success).toBe(false);
 expect(catalogSchema.safeParse({...catalog,products:[{...catalog.products[0],price:-1}]}).success).toBe(false);
 const reversed=catalogSchema.parse({...catalog,products:[...catalog.products].reverse()});
 expect(reversed.products.at(-1)!.id).toBe(catalog.products[0].id);
});
