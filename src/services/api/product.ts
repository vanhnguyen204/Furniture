import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import Product from '../../models/Product.ts';

export const fetchAllData = () =>
  request(endPoint().listProductGlobal, Method.GET);
export const fetchMyProduct = () =>
  request(endPoint().getMyProducts, Method.GET);
export const createProduct = (product: any) =>
  request(endPoint().createProduct, Method.POST, product);
export const updateProduct = (product: any) =>
  request(endPoint().updateProduct, Method.PUT, product);
export const deleteProduct = (id: string) =>
  request(endPoint().deleteProduct + id, Method.DELETE);
export const productDetails = (id: string) =>
  request(endPoint().productDetails + id, Method.GET);
export const getProductsByCategory = (category: string) =>
  request(endPoint().getProductsByCategory + category, Method.GET);
export const createFavorite = (productId: string) =>
  request(endPoint().createFavorite, Method.POST, {productId});
export const deleteFavorite = (productId: string) =>
  request(endPoint().deleteFavorite + productId, Method.DELETE);
export const checkIsFavorite = (productId: string) =>
  request(endPoint().isFavorite + productId, Method.GET);

export const fetchFavoriteProductsByUser = () =>
  request(endPoint().favoriteOfUser, Method.GET);

export const searchProduct = (name: string) =>
  request(endPoint().searchProduct + name, Method.GET);
