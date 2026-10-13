import settings from './theme.json' with { type: "json" };
import { themeSchema } from "./schema";
export const theme = themeSchema.parse(settings);
export function themeCss() {
  const groups = { color: theme.colors, font: theme.fonts, layout: theme.layout };
  return ':root{' + Object.entries(groups).flatMap(([prefix, values]) => Object.entries(values).map(([key, value]) => '--' + prefix + '-' + key + ':' + value + ';')).join('') + '}';
}
