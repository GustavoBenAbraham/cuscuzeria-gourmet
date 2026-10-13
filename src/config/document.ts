import { assetPath } from "./paths";
import { site } from './site';
import { theme, themeCss } from './theme';
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
export function documentHead(base = "/") {
 const schema = {'@context':'https://schema.org','@type':'Restaurant',name:site.restaurant.name,telephone:'+'+site.restaurant.phone,hasMenu:site.restaurant.menu,sameAs:[site.restaurant.instagram]};
 const title=site.seo.title.replaceAll('{restaurantName}',site.restaurant.name);
 const description=site.seo.description.replaceAll('{restaurantName}',site.restaurant.name);
 return [
 ...theme.fontStylesheets.map(url => '<link rel="stylesheet" href="'+escapeHtml(url)+'" />'),
 '<meta name="theme-color" content="'+escapeHtml(site.seo.themeColor)+'" />',
 '<title>'+escapeHtml(title)+'</title>',
 '<meta name="description" content="'+escapeHtml(description)+'" />',
 '<meta property="og:title" content="'+escapeHtml(site.restaurant.name)+'" />',
 '<meta property="og:description" content="'+escapeHtml(site.seo.socialDescription)+'" />',
 '<meta property="og:type" content="website" />',
 '<link rel="icon" type="image/png" sizes="32x32" href="'+escapeHtml(assetPath(site.branding.faviconPng, base))+'" />',
 '<link rel="icon" type="image/svg+xml" href="'+escapeHtml(assetPath(site.branding.favicon, base))+'" />',
 '<link rel="apple-touch-icon" sizes="180x180" href="'+escapeHtml(assetPath(site.branding.appleTouchIcon, base))+'" />',
 '<script type="application/ld+json">'+JSON.stringify(schema).replaceAll('<','\\u003c')+'</script>',
 '<style id="site-theme">'+themeCss().replaceAll('<','\\3c ')+'</style>'
 ].join('\n');
}
