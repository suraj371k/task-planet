import { io } from "socket.io-client";

const backend_url='https://task-planet.onrender.com'

export const socket = io(backend_url);