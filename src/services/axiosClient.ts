import axios from 'axios';
import {ProdConfig} from '../config/AxiosConfig.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../constants/AsyncStorage.ts';

const axiosClient = axios.create({
  baseURL: ProdConfig.BASE_URL,
  timeout: 10000,
});

axiosClient.interceptors.request.use(async config => {
  const token = (await AsyncStorage.getItem(ACCESS_TOKEN)) || '';
  // @ts-ignore
  config.headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...config.headers,
  };
  return config;
});
axiosClient.interceptors.response.use(
  res => {
    if (res.data) {
      return res.data;
    }
    throw Error('Error response from axios');
  },
  error => {
    throw new Error(JSON.stringify(error.response));
  },
);
export const request = async (url: string, method: string, data?: any) => {
  try {
    return await axiosClient.request({
      url,
      method,
      data,
    });
  } catch (error: any) {
    handleLogError(error, url, method);
    throw error;
  }
};
export const uploadRequest = async (
  url: string,
  data: object,
  authToken: any,
) => {
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (e) {
    handleLogError(e, url, 'POST');
  }
};
const handleLogError = (error: any, url: string, method: string): void => {
  console.log(`Error in API call ${method} ${url}`);
};
export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  OPTIONS: 'OPTION',
  HEAD: 'head',
  PATCH: 'PATCH',
};
export default axiosClient;
