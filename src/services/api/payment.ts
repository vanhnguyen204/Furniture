import Payment from '../../models/Payment.ts';
import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';

export const createPayment = (payment: Payment) =>
  request(endPoint().createPayment, Method.POST, {
    cartNumber: payment.cartNumber,
    bankName: payment.bankName,
    expiryDate: payment.expiryDate,
    cvv: payment.cvv,
    cartHolderName: payment.cartHolderName,
    type: payment.type,
  });
export const fetchMyPayment = () =>
  request(endPoint().getMyPayment, Method.GET);

export const activePayment = (id: string) =>
  request(endPoint().activePayment + id, Method.POST);

export const removePayment = (id: string) =>
  request(endPoint().removePayment + id, Method.DELETE);

export const getMySelectedPayment = () =>
  request(endPoint().getMySelectedPayment, Method.POST);
