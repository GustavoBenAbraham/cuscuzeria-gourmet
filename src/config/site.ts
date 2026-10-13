import settings from './site.json' with { type: "json" };
import { siteSchema } from './schema';
export const site = siteSchema.parse(settings);
export const restaurant = site.restaurant;
export const whatsappLink = () => 'https://wa.me/' + restaurant.phone;
export const displayPhone = () => restaurant.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
export const instagramHandle = () => '@' + new URL(restaurant.instagram).pathname.split('/').filter(Boolean)[0];
