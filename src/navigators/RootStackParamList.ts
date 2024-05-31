import Product from '../models/Product.ts';

export type RootStackParamList = {
  Home: undefined;
  Checkout: {totalPrice: number};
  WelcomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  BottomTab: undefined;
  ProductDetailsScreen: {item: any};
  Cart: undefined;
  ShippingAddress: undefined;
  Payment: undefined;
  PaymentHandleScreen: {item?: any};
  MyProducts: undefined;
  ManageMyProducts: {isCreate: boolean; item?: Product};
};
