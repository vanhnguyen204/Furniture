interface Product {
  [x: string]: any;
  userId?: string;
  name: string;
  price: number;
  description: string;
  image: any;
  type: string;
  _id?: string;
}

export default Product;
