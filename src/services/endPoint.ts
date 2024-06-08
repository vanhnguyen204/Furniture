import {ProdConfig} from '../config/axiosConfig.ts';

export default () => {
  const baseURL = ProdConfig.BASE_URL;
  return {
    baseURL: baseURL,
    register: `${baseURL}/api/auth/register`,
    login: `${baseURL}/api/auth/login`,
    //product
    listProductGlobal: `${baseURL}/api/product/`,
    getMyProducts: `${baseURL}/api/product/my-product`,
    productDetails: `${baseURL}/api/product/details`,
    deleteProduct: `${baseURL}/api/product/delete`,
    createProduct: `${baseURL}/api/product/create`,
    updateProduct: `${baseURL}/api/product/update`,
    listProductOfUser: `${baseURL}/api/product/product-user`,
    createFavorite: `${baseURL}/api/favorite/create`,
    deleteFavorite: `${baseURL}/api/favorite/delete`,
    isFavorite: `${baseURL}/api/favorite/isFavorite`,
    favoriteProductsByUserId: `${baseURL}/api/favorite/favorites-user`,
    //cart
    checkProductIsInCart: `${baseURL}/api/cart/checking-product`,
    fetchDataFromCart: `${baseURL}/api/cart/my-cart`,
    addProductToCart: `${baseURL}/api/cart/add`,
    removeFromCart: `${baseURL}/api/cart/remove`,
    //shipping address
    createShippingAddress: `${baseURL}/api/shipping-address/`,
    updateShippingAddress: `${baseURL}/api/shipping-address/`,
    deleteShippingAddress: `${baseURL}/api/shipping-address/`,
    getShippingAddress: `${baseURL}/api/shipping-address/`,
    activeShippingAddress: `${baseURL}/api/shipping-address/active`,
    getMyShippingAddressIsSelected: `${baseURL}/api/shipping-address/address-selected`,

    //payment method
    getMyPayment: `${baseURL}/api/payment/my-payment`,
    createPayment: `${baseURL}/api/payment/`,
    removePayment: `${baseURL}/api/payment/`,
    activePayment: `${baseURL}/api/payment/active/`,
    getMySelectedPayment: `${baseURL}/api/payment/my-selected-payment`,
    //search
    searchProduct: `${baseURL}/api/product/search`,

    //invoice
    createInvoice: `${baseURL}/api/invoice/`,
    getMyInvoice: `${baseURL}/api/invoice/`,
    getInvoiceDetails: `${baseURL}/api/invoice/details/`,
    //review
    createReview: `${baseURL}/api/review/`,
    getMyReview: `${baseURL}/api/review/`,
    deleteReview: `${baseURL}/api/review/`,
    reviewed: `${baseURL}/api/review/`,
  };
};
