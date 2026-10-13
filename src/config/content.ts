import content from './content.json' with { type: "json" };
import { site, restaurant, displayPhone, instagramHandle } from './site';
export function formatText(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token));
}
import { products } from "../data/catalog";
const tokens = { tagline: site.branding.tagline, taglineUpper: site.branding.tagline.toUpperCase(), ...site.cart, menuPageCount: site.menuPages.length, cuscuzCount: products.filter(p => p.categoryId.includes("cuscuz")).length, restaurantName: restaurant.name, restaurantNameUpper: restaurant.name.toUpperCase(), phone: displayPhone(), instagram: instagramHandle() };
export const copy = Object.fromEntries(Object.entries(content).map(([section, entries]) => [section, Object.fromEntries(Object.entries(entries).map(([key, text]) => [key, formatText(text, tokens)]))])) as typeof content;
