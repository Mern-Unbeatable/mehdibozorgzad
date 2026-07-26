import { io } from 'socket.io-client';
import { getToken } from '../api/client';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const socket = io(BASE_URL, {
  autoConnect: false,
  auth: () => ({ token: getToken() }),
});

export function connectSocket() {
  if (!socket.connected) {
    socket.auth = { token: getToken() };
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket.connected) socket.disconnect();
}
