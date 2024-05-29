import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';

export const fetchAllData = () =>
  request(endPoint().listProductGlobal, Method.GET);
export const createProduct = (product: any) =>
  request(endPoint().createProduct, Method.POST, product);
export const updateProduct = (product: any) =>
  request(endPoint().updateProduct, Method.POST, product);
export const deleteProduct = (id: any) =>
  request(endPoint().deleteProduct, Method.POST, {id: id});
export const productDetails = (id: any) =>
  request(endPoint().productDetails, Method.GET, {id: id});
export const listProductOfUser = (userId: any) =>
  request(endPoint().createProduct, Method.GET, {userId: userId});
export const createFavorite = (productId: string, userId: string) =>
  request(endPoint().createFavorite, Method.POST, {productId, userId});
export const deleteFavorite = (productId: string) =>
  request(endPoint().deleteFavorite, Method.POST, {productId});
export const checkIsFavorite = (productId: string) =>
  request(endPoint().isFavorite, Method.POST, {productId});

export const fetchFavoriteProductsByUser = () =>
  request(endPoint().favoriteProductsByUserId, Method.POST);