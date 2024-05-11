import {IP_ADDRESS} from '../utils/ip.ts';

export const ProdConfig = {
  BASE_URL: `http://${IP_ADDRESS}:3000`,
  SOCKET_URL: `http://${IP_ADDRESS}:8080`,
};
