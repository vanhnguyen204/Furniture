import {ProdConfig} from '../config/axiosConfig.ts';

export default () => {
  const baseURL = ProdConfig.BASE_URL;
  return {
    baseURL: baseURL,
    register: `${baseURL}/api/auth/register`,
    login: `${baseURL}/api/auth/login`,
    listProductGlobal: `${baseURL}/api/product/`,
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
  };
};
