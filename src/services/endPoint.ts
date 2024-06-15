import {ProdConfig} from '../config/axiosConfig.ts';
import { changPassForgot } from "./api/auth.ts";

export default () => {
  const baseURL = ProdConfig.BASE_URL;
  return {
    baseURL: baseURL,
    //authentication
    register: `${baseURL}/api/auth/register`,
    login: `${baseURL}/api/auth/login`,
    getInfor: `${baseURL}/api/auth/infor`,
    updateInfor: `${baseURL}/api/auth/user`,
    uploadAvatar: `${baseURL}/api/auth/user/avatar`,
    //forgot password
    verifyEmail: `${baseURL}/api/auth/verify-email`,
    verifyCodeResetPass: `${baseURL}/api/auth/verify-code`,
    changPassForgot: `${baseURL}/api/auth/reset-pass`,
    //product
    listProductGlobal: `${baseURL}/api/product/`,
    getMyProducts: `${baseURL}/api/product/my-product`,
    productDetails: `${baseURL}/api/product/details/`,
    deleteProduct: `${baseURL}/api/product/`,
    createProduct: `${baseURL}/api/product/`,
    updateProduct: `${baseURL}/api/product/`,
    listProductOfUser: `${baseURL}/api/product/product-user`,
    createFavorite: `${baseURL}/api/favorite/`,
    deleteFavorite: `${baseURL}/api/favorite/`,
    isFavorite: `${baseURL}/api/favorite/isFavorite/`,
    favoriteOfUser: `${baseURL}/api/favorite/favorites-user`,
    getProductsByCategory: `${baseURL}/api/product/categories/`,
    //cart
    checkProductIsInCart: `${baseURL}/api/cart/checking-product`,
    fetchDataFromCart: `${baseURL}/api/cart/my-cart`,
    addProductToCart: `${baseURL}/api/cart/add`,
    removeFromCart: `${baseURL}/api/cart/`,
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
    searchProduct: `${baseURL}/api/product/search/`,

    //invoice
    createInvoice: `${baseURL}/api/invoice/`,
    getMyInvoice: `${baseURL}/api/invoice/`,
    getInvoiceDetails: `${baseURL}/api/invoice/details/`,
    getStatistic: `${baseURL}/api/invoice/statistical/`,
    //review
    createReview: `${baseURL}/api/review/`,
    getMyReview: `${baseURL}/api/review/`,
    deleteReview: `${baseURL}/api/review/`,
    reviewed: `${baseURL}/api/review/`,
    countReviews: `${baseURL}/api/review/count/`,
    detailReviewProduct: `${baseURL}/api/review/details/`,
  };
};
