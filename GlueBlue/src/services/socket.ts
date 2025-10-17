import { io, Socket } from 'socket.io-client';
import { API_URL } from '../config/env';

let socket: Socket | null = null;

export function initSocket(token?: string) {
  if (socket) return socket;
  socket = io(API_URL, {
    transports: ['websocket'],
    auth: token ? { token } : undefined,
  });

  socket.on('connect', () => console.log('socket connected', socket?.id));
  socket.on('connect_error', (err) => console.warn('socket connect_error', err));
  return socket;
}

export function getSocket() {
  if (!socket) throw new Error('Socket not initialized. call initSocket()');
  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://your-socket-server-url.com'; // Replace with your socket server URL

class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
            reconnection: true,
        });
    }

    public connect() {
        this.socket.connect();
    }

    public disconnect() {
        this.socket.disconnect();
    }

    public onMessage(callback: (message: any) => void) {
        this.socket.on('message', callback);
    }

    public sendMessage(message: any) {
        this.socket.emit('message', message);
    }

    public onEvent(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    public offEvent(event: string) {
        this.socket.off(event);
    }
}

const socketService = new SocketService();
export default socketService;