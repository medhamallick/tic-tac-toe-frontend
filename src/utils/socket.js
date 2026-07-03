import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const socket = io(
    // "http://localhost:3000",
    BASE_URL, {
        autoConnect: false,
    }
);

// the socket connected immediately when the app loaded.
// import {io} from "socket.io-client";
// export const socket = io("http://localhost:3000");

//tries connecting to:localhost:3000 -> where my backend server is running