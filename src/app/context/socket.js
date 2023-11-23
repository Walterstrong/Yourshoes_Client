import React, { createContext } from "react";
import io from "socket.io-client";
import { http://localhost:3003 } from "app/lib/config";

export const socket = io(http://localhost:3003);
export const SocketContext = createContext();
