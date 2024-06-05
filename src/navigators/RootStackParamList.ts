import Product from '../models/Product.ts';
import Invoice from '../models/Invoice.ts';

export type RootStackParamList = {
  Home: undefined;
  Checkout: {totalPrice: number; products: Product[]};
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
  DonePurchase: undefined;
  HistoryPurchase: undefined;
  InvoiceDetails: {invoice: Invoice};
};
