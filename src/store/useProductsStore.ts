import { create } from 'zustand';
import { ProductT } from '../types/types';

type ProductsState = {
  products: ProductT[];
  setProducts: (products: ProductT[]) => void;
  deleteProduct: (id: number) => void;
  toggleLike: (id: number) => void;
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  deleteProduct: (id: number) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  toggleLike: (id: number) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, hasLike: !product.hasLike } : product,
      ),
    })),
}));
