import {create} from 'zustand';
import Address from "../models/Address.ts";
type Infor = {
  name: string;
  email: string;
  passWord: string;
  avatar: string;
};

interface UserProps {
  infor: Infor;
  myOrders: [];
  myPayments: [];
  myAddresses: Address[];
  myReviews: [];
  myFavorites: [];
}
interface UserActions extends UserProps {
  setInfor: (infor: Infor) => void;
  setMyOrder: (myOrders: any, order: any) => void;
  setMyPayment: (myPayments: any, payment: string) => void;
  setMyAddress: (myAddresses: Address[], address?: Address) => void;
  setMyReview: (myReviews: any, review: string) => void;
  setMyFavorites: (favorites: any, favorite?: any) => void;
}
export const useUserInformation = create<UserActions>(set => ({
  infor: {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    passWord: '123456',
    avatar: 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
  },
  myOrders: [],
  myAddresses: [],
  myPayments: [],
  myReviews: [],
  myFavorites: [],
  setInfor: (infor: Infor) => set({infor}),
  setMyOrder: (myOrders, order) => set({myOrders: myOrders.concat(order)}),
  setMyPayment: (myPayments, payment) =>
    set({myPayments: myPayments.concat(payment)}),
  setMyAddress: (myAddresses: Address[], address) =>
    set({myAddresses: !address ? myAddresses : myAddresses.concat(address)}),
  setMyReview: (myReviews, review) =>
    set({myReviews: myReviews.concat(review)}),
  setMyFavorites: (favorites, favorite) =>
    set({myFavorites: favorite ? favorites.concat(favorite) : favorites}),
}));
