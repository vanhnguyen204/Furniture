import {create} from 'zustand';

interface GlobalType {
  products: [];
}

interface GlobalActions extends GlobalType {
  setProducts: (products: []) => void;
}

export const useStoreGlobal = create<GlobalActions>(set => ({
  products: [],
  setProducts: (products: []) => set({products: products}),
}));
