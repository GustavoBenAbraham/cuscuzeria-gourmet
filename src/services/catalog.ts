import { products, categories } from "../data/catalog";
export const catalogService = {
  async getCatalog() {
    return {
      products,
      categories: categories.filter((c) =>
        products.some((p) => p.categoryId === c.id),
      ),
    };
  },
};
