import {Method, request, requestAxios, uploadRequest} from '../axiosClient.ts';
import endPoint from '../endPoint.ts';
import {User} from '../../models/User.ts';

export const login = (email: string, pass: any) =>
  request(endPoint().login, Method.POST, {email: email, passWord: pass});

export const signup = (email: string, pass: any, name: string) =>
  request(endPoint().register, Method.POST, {
    email: email,
    passWord: pass,
    name: name,
  });

export const getInfor = () => request(endPoint().getInfor, Method.GET);
export const getUserInfor = () =>
  requestAxios<User>(endPoint().getInfor, Method.GET);

export const updateInfor = (name?: string, password?: string) =>
  requestAxios<any>(endPoint().updateInfor, Method.PUT, {
    name,
    password: password,
  });

export const uploadAvatar = (formData: FormData) =>
  uploadRequest(endPoint().uploadAvatar, formData);

export const verifyEmail = (email: string) =>
  requestAxios(endPoint().verifyEmail, Method.POST, {email: email});
export const verifyCode = (code: number) =>
  requestAxios(endPoint().verifyCodeResetPass, Method.POST, {code: code});
export const changPassForgot = (email: string, password: string) =>
  request(endPoint().changPassForgot, Method.PUT, {email, password});
