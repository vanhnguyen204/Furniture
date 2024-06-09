import {Method, request} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';

export const login = (email: string, pass: any) =>
  request(endPoint().login, Method.POST, {email: email, passWord: pass});

export const signup = (email: string, pass: any, name: string) =>
  request(endPoint().register, Method.POST, {
    email: email,
    passWord: pass,
    name: name,
  });

export const getInfor = () => request(endPoint().getInfor, Method.GET);
export const updateInfor = (name: string) =>
  request(endPoint().updateInfor, Method.PATCH, {name});
