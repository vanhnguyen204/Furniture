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
  request(endPoint().getMyPayment, Method.POST);
