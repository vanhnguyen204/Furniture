import {Method, request} from '../axiosClient';
import endPoint from '../endPoint';
import product from '../../models/Product.ts';

export interface RequestInvoice {
  productId: string;
  price: number;
  quantity: number;
}

export const createInvoice = (
  data: RequestInvoice[],
  totalPrice: number,
  paymentType: string,
  shippingAddress: string,
  delivery: string,
) =>
  request(endPoint().createInvoice, Method.POST, {
    data: data,
    totalPrice,
    paymentType,
    shippingAddress,
    delivery,
  });

export const getMyInvoice = () => request(endPoint().getMyInvoice, Method.GET);
export const getInvoiceDetails = (invoiceId: string) =>
  request(endPoint().getInvoiceDetails + invoiceId, Method.GET);

export const checkReviewed = (productId: string) =>
  request(endPoint().reviewed + productId, Method.GET);
