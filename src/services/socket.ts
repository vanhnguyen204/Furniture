import {io} from 'socket.io-client';
import {socketIoAddress} from '../utils/ip.ts';

export const socket = io(socketIoAddress);
