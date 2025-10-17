import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'YOUR_SOCKET_SERVER_URL'; // Replace with your socket server URL

const useSocket = () => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('connect', () => {
            console.log('Socket connected');
        });

        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        if (socketRef.current) {
            socketRef.current.emit('message', message);
        }
    };

    const onMessageReceived = (callback) => {
        if (socketRef.current) {
            socketRef.current.on('message', callback);
        }
    };

    return {
        sendMessage,
        onMessageReceived,
    };
};

export default useSocket;