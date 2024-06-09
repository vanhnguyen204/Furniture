import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import Review from '../../models/Review.ts';

export const getMyReview = () => request(endPoint().getMyReview, Method.GET);
export const deleteReview = (reviewId: string) =>
  request(endPoint().deleteReview + reviewId, Method.DELETE);
export const createReview = (
  productId: string,
  rate: number,
  comment: string,
) =>
  request(endPoint().createReview, Method.POST, {
    productId,
    rate,
    comment,
  });

export const countReview = (productId: string) =>
  request(endPoint().countReviews + productId, Method.GET);
