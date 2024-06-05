import {Method, request} from '../axiosClient';
import endPoint from '../endPoint';

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
  request(endPoint().getInvoiceDetails, Method.POST, {invoiceId});
