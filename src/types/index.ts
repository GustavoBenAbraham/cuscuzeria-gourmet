export interface Category {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  categoryId: string;
  image: string | null;
  available: boolean;
  featured: boolean;
  tags: string[];
  source: { url: string; page: number };
  verificationStatus: "verified" | "pending";
}
export interface CartItem {
  productId: string;
  quantity: number;
  note: string;
}
export interface RestaurantInfo {
  name: string;
  phone: string;
  instagram: string;
  menu: string;
  deliveryUrl: string;
  confirmedOrderModes: ("retirada" | "entrega")[];
}
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  note: string;
}
export interface Order {
  name: string;
  items: OrderItem[];
  note: string;
  mode?: "retirada" | "entrega";
  address?: string;
}
