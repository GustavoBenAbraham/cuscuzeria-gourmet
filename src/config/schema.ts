import { z } from 'zod';
const text = z.string().trim().min(1);
const httpsUrl = z.string().url().refine(value => new URL(value).protocol === 'https:', 'Use an HTTPS URL');
const asset = z.string().regex(/^\/(?!\/)[^<>]+$/, 'Use a local public asset path');
const positive = z.number().int().positive();
const route = z.string().regex(/^\/(?:[a-z0-9-]+)?$/, 'Use a root-relative route');
export const siteSchema = z.object({
 restaurant: z.object({name: text, phone: z.string().regex(/^\d{10,15}$/), instagram: httpsUrl, menu: httpsUrl, deliveryUrl: httpsUrl, confirmedOrderModes: z.array(z.enum(['retirada', 'entrega']))}),
 locale: text.refine(value => {try {new Intl.NumberFormat(value);return true;}catch{return false;}}, 'Invalid locale'),
 currency: z.string().regex(/^[A-Z]{3}$/),
 branding: z.object({tagline:text,logo:asset,logoWidth:positive,logoHeight:positive,hero:asset,heroWidth:positive,heroHeight:positive,favicon:asset,faviconPng:asset,appleTouchIcon:asset}),
 seo:z.object({title:text,description:text,socialDescription:text,themeColor:z.string().regex(/^#[0-9a-f]{6}$/i)}),
 cart:z.object({storageKey:text,maxQuantity:positive.max(999),itemNoteMaxLength:positive,nameMinLength:positive,nameMaxLength:positive,orderNoteMaxLength:positive,addressMinLength:positive,addressMaxLength:positive}).refine(v=>v.nameMinLength<=v.nameMaxLength && v.addressMinLength<=v.addressMaxLength, 'Minimum lengths must not exceed maximum lengths'),
 catalog:z.object({homeCategory:text}),
 features:z.object({cordel:z.boolean(),originalMenu:z.boolean(),floatingWhatsapp:z.boolean()}),
 navigation:z.array(z.object({id:z.enum(['home','menu','story','contact']),label:text,title:text})).min(1),
 pages:z.object({cart:z.object({title:text}),notFoundTitle:text}),
 menuPages:z.array(z.object({title:text,image:asset,width:positive,height:positive})).min(1),
 routes:z.object({home:z.literal('/'),menu:route,cart:route,story:route,contact:route}).refine(v=>new Set(Object.values(v)).size===Object.values(v).length, 'Routes must be unique'),
 sections:z.object({menuId:z.string().regex(/^[a-z][a-z0-9-]*$/),mainId:z.string().regex(/^[a-z][a-z0-9-]*$/)})
}).refine(v=>new Set(v.navigation.map(n=>n.id)).size===v.navigation.length,'Navigation IDs must be unique');
export const cordelSchema = z.array(z.object({title:text,number:text,kind:z.enum(['corn','landscape','music']),lines:z.array(text).min(1)})).refine(v=>new Set(v.map(p=>p.number)).size===v.length,'Cordel edition numbers must be unique');

export const themeSchema = z.object({
 colors: z.record(z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*$/), z.string().regex(/^#[0-9a-f]{3,8}$/i)),
 fontStylesheets: z.array(httpsUrl),
 fonts: z.object({heading:text,display:text,body:text,editorial:text}).refine(v=>Object.values(v).every(value=>!/[<>;{}]/.test(value)), 'Invalid font family'),
 layout:z.object({contentWidth:text,desktopLogoSize:text,mobileLogoSize:text}).refine(v=>Object.values(v).every(value=>/^\d+(?:\.\d+)?(?:px|rem|em|vw|%)$/.test(value)), 'Invalid layout size')
});

export const catalogSchema = z.object({
 categories:z.array(z.object({id:text,name:text})).min(1),
 products:z.array(z.object({id:text,name:text,description:text,price:z.number().finite().nonnegative().nullable(),categoryId:text,image:asset.nullable(),available:z.boolean(),featured:z.boolean(),tags:z.array(text),sourcePage:positive,verificationStatus:z.enum(['verified','pending'])}))
}).superRefine((value, ctx) => {
 const categoryIds=new Set(value.categories.map(c=>c.id));
 if(categoryIds.size!==value.categories.length)ctx.addIssue({code:'custom',message:'Category IDs must be unique'});
 if(new Set(value.products.map(p=>p.id)).size!==value.products.length)ctx.addIssue({code:'custom',message:'Product IDs must be unique'});
 if(value.products.some(p=>!categoryIds.has(p.categoryId)))ctx.addIssue({code:'custom',message:'Products must reference an existing category'});
});
