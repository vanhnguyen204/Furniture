import {Method, request} from '../axiosClient';
import endPoint from '../endPoint';

export interface RequestInvoice {
  productId: string;
  price: number;
  quantity: number;
}

export const createInvoice = (data: RequestInvoice[]) =>
  request(endPoint().createInvoice, Method.POST, {data: data});
