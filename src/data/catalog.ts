import settings from '../config/catalog.json' with { type: 'json' };
import { catalogSchema } from '../config/schema';
import { site, restaurant } from '../config/site';
import type { Category, Product } from '../types';
const catalog = catalogSchema.parse(settings);
if (!catalog.categories.some(category => category.id === site.catalog.homeCategory)) {
  throw new Error('The home category must exist in the catalog');
}
if (catalog.products.some(product => product.sourcePage > site.menuPages.length)) {
  throw new Error('Product source pages must reference configured menu pages');
}
export const categories: Category[] = catalog.categories;
export const products: Product[] = catalog.products.map(({sourcePage, ...product}) => ({...product,source:{url:restaurant.menu,page:sourcePage}}));
