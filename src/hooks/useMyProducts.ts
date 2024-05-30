import {create} from 'zustand';
import Product from '../models/Product.ts';

export interface MyProductType {
  myProducts: Product[];
}

interface MyProductActions extends MyProductType {
  addNewProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (newProduct: Product, index: number) => void;
}

export const useMyProducts = create<MyProductActions>(set => ({
  myProducts: [],
  addNewProduct: (value: Product) =>
    set(state => ({
      myProducts: [...state.myProducts, value],
    })),

  removeProduct: (productId: string) =>
    set(state => ({
      myProducts: state.myProducts.filter(item => item.productId !== productId),
    })),
  updateProduct: (newProduct: Product, index: number) =>
    set(state => ({
      myProducts: state.myProducts.map((item: Product, i: number) => {
        if (index === i) {
          item = newProduct;
        }
        return item;
      }),
    })),
}));
