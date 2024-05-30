class Payment {
  _id: string | undefined;
  cartNumber: string;
  expiryDate: string;
  cvv: number;
  cartHolderName: string;
  isSelected: boolean;
  type: string;
  bankName: string;
  image: string;

  constructor(
    cartNumber: string,
    expiryDate: string,
    cvv: number,
    cartHolderName: string,
    isSelected: boolean,
    type: string,
    bankName: string,
    image: string,
  ) {
    this.cartNumber = cartNumber;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
    this.cartHolderName = cartHolderName;
    this.isSelected = isSelected;
    this.type = type;
    this.bankName = bankName;
    this.image = image;
  }
}

export default Payment;
