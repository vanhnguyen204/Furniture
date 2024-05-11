import {ProdConfig} from '../config/axiosConfig.ts';

export default () => {
  const baseURL = ProdConfig.BASE_URL;
  return {
    baseURL: baseURL,
    register: `${baseURL}/api/auth/register`,
    login: `${baseURL}/api/auth/login`,
  };
};
