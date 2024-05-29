import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';

export const checkVarProductInCart = (productId: String) =>
  request(endPoint().checkProductIsInCart, Method.POST, {productId});
export const getMyCart = () =>
  request(endPoint().fetchDataFromCart, Method.POST);
export const addProductToCart = (productId: String, quantity: number) =>
  request(endPoint().addProductToCart, Method.POST, {productId, quantity});

export const removeFromCart = (productId: string) =>
  request(endPoint().removeFromCart, Method.DELETE, {productId});
