import axios from "axios";

// Set base URL for API requests (will be proxied by Vite)
const API = axios.create({
  baseURL: "/api", // Will be handled by Vite's proxy
  headers: {
    'Content-Type': 'application/json'
  }
});

// Topic related API calls
export const getTopics = () => API.get('/topics');
export const createTopic = (topicData) => API.post('/topics', topicData);
export const updateTopic = (id, topicData) => API.patch(`/topics/${id}`, topicData);
export const deleteTopic = (id) => API.delete(`/topics/${id}`);

// Note related API calls
export const getNotesByTopic = (topicId) => API.get(`/notes/topic/${topicId}`);
export const createNote = (noteData) => {
  console.log("Sending POST /notes with:", noteData);
  return API.post('/notes', noteData);
};
export const updateNote = (id, noteData) => API.put(`/notes/${id}`, noteData);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export default API;
