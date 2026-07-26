import { useCallback, useEffect, useRef } from 'react';
import { connectSocket, disconnectSocket, socket } from '../api/socket';

/**
 * Connects to the chat socket and listens for real-time events.
 */
export function useSocket({
  conversationId,
  onMessage,
  onTypingStart,
  onTypingStop,
  onUserOnline,
  onUserOffline,
}) {
  const handlersRef = useRef({
    onMessage,
    onTypingStart,
    onTypingStop,
    onUserOnline,
    onUserOffline,
  });

  handlersRef.current = {
    onMessage,
    onTypingStart,
    onTypingStop,
    onUserOnline,
    onUserOffline,
  };

  useEffect(() => {
    connectSocket();

    const handleMessage = (payload) => handlersRef.current.onMessage?.(payload);
    const handleTypingStart = (payload) => handlersRef.current.onTypingStart?.(payload);
    const handleTypingStop = (payload) => handlersRef.current.onTypingStop?.(payload);
    const handleUserOnline = (payload) => handlersRef.current.onUserOnline?.(payload);
    const handleUserOffline = (payload) => handlersRef.current.onUserOffline?.(payload);

    socket.on('message:new', handleMessage);
    socket.on('typing:start', handleTypingStart);
    socket.on('typing:stop', handleTypingStop);
    socket.on('user:online', handleUserOnline);
    socket.on('user:offline', handleUserOffline);

    return () => {
      socket.off('message:new', handleMessage);
      socket.off('typing:start', handleTypingStart);
      socket.off('typing:stop', handleTypingStop);
      socket.off('user:online', handleUserOnline);
      socket.off('user:offline', handleUserOffline);
      disconnectSocket();
    };
  }, []);

  const sendTyping = useCallback(
    (isTyping) => {
      if (!conversationId) return;
      socket.emit(isTyping ? 'typing:start' : 'typing:stop', {
        conversationId,
      });
    },
    [conversationId],
  );

  return { sendTyping };
}

export default useSocket;
