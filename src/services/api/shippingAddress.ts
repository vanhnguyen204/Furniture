import Address from '../../models/Address.ts';
import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';

export const createShippingAddress = (address: Address) =>
  request(endPoint().createShippingAddress, Method.POST, address);

export const getMyShippingAddress = () =>
  request(endPoint().getShippingAddress, Method.GET);

export const activeShippingAddress = (id: String) =>
  request(endPoint().activeShippingAddress, Method.POST, {
    shippingAddressId: id,
  });

export const getMyAddressIsSelected = () =>
  request(endPoint().getMyShippingAddressIsSelected, Method.POST);

export const updateMyShippingAddress = (shippingAddress: any) =>
  request(endPoint().updateShippingAddress, Method.PATCH, shippingAddress);

export const removeMyShippingAddress = (id: string) =>
  request(endPoint().deleteShippingAddress, Method.DELETE, {addressId: id});
