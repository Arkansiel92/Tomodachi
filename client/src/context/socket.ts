import {createContext} from 'react';
import {io, Socket} from 'socket.io-client';

export interface ExtendedSocket extends Socket {
    name?: string,
    room?: string | null,
    role?: string | null,
    isReady?: boolean,
    isTurn?: boolean,
}

export const socket: ExtendedSocket = io('http://192.168.1.10:3001', {transports: ['websocket']}); // IP on private network (localhost works too)

socket.name = '';
socket.room = null;
socket.role = null;
socket.isReady = false;
socket.isTurn = false;

export const socketContext = createContext(socket);


