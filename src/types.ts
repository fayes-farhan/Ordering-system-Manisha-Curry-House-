export type CategoryType = 'makanan' | 'minuman';

export interface MenuCategory {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  order: number;
}

export interface MenuSubcategory {
  id: string;
  categoryId: string;
  name: string;
  icon: string;
  order: number;
}

export interface MenuItem {
  id: string;
  subcategoryId: string;
  categoryType: CategoryType;
  name: string;
  basePrice: number;
  hasTempOption: boolean;
  pricePanas?: number;
  priceSejuk?: number;
  imageUrl: string;
  isAvailable: boolean;
  description?: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  quantity: number;
  selectedTemp: 'panas' | 'sejuk' | null;
  unitPrice: number;
  subtotal: number;
  categoryType: CategoryType;
}

export interface Order {
  id: string;
  tableSession: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'qr';
  status: 'confirmed';
  createdAt: any; // Firestore Timestamp
}
