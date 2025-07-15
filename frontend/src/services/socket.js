import { io } from "socket.io-client";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const socket = io(`${backend_url}`);