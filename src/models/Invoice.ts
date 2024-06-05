interface Invoice {
  _id: string;
  userId: string;
  totalPrice: number;
  dateExport: string;
  paymentType: string;
  shippingAddress: string;
  delivery: string;
}

export default Invoice;
