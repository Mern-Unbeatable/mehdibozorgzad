import { apiGet, apiPost, apiPut } from './client';

export function fetchChatRooms() {
  return apiGet('/api/chat/rooms');
}

export function createChatRoom() {
  return apiPost('/api/chat/rooms', {});
}

export function fetchChatMessages(roomId) {
  return apiGet(`/api/chat/rooms/${roomId}/messages`);
}

export function sendChatMessage(roomId, body) {
  return apiPost(`/api/chat/rooms/${roomId}/messages`, body);
}

export function markChatRoomRead(roomId) {
  return apiPut(`/api/chat/rooms/${roomId}/read`, {});
}
