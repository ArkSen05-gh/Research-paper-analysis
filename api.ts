import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const registerUser = (data: any) => API.post("/auth/register", data);
export const loginUser = (data: any) => API.post("/auth/login", data);

// Research endpoints
export const searchResearch = (topic: string) => 
  API.get(`/research/search?topic=${encodeURIComponent(topic)}`);

export const buildMethodology = (data: { topic: string; context?: string }) => 
  API.post("/research/methodology", data);

export const checkNovelty = (data: { topic: string; context?: string }) => 
  API.post("/research/novelty", data);

export const analyzeTrends = (data: { topic: string; context?: string }) => 
  API.post("/research/trends", data);

export const generateGrant = (data: { topic: string; context?: string }) => 
  API.post("/grant/generate", data);

// File utilities
export const uploadPaper = (formData: FormData) => API.post("/research/upload", formData);

export default API;