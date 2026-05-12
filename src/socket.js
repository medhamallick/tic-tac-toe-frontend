import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {

  //the socket stays disconnected until YOU decide
  autoConnect: false,
});


// the socket connected immediately when the app loaded.
// import {io} from "socket.io-client";
// export const socket = io("http://localhost:3000");

//tries connecting to:localhost:3000 -> where my backend server is running
