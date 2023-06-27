import { ObjectId } from "mongoose";
import { app } from "./app";
import { connectDB } from "./db";
import swaggerDocs from "./services/swagger";

import http from "http";

const server = http.createServer(app);

const port = process.env.PORT! || 3000;
console.log(process.env.dbURI);

let io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
let onlineUser: ObjectId[] = [];

io.on("connection", (socket: any) => {
  socket.on("setup", (currentUser: any) => {
    socket.join(currentUser);
  });
  socket.on("join room", (room: any) => socket.join(room));
  socket.on("typing", (room: any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));
  socket.on("message received", (room: any) =>
    socket.in(room).emit("message received")
  );
  socket.on("new message", (message: any) =>
    socket.in(message.chat._id).emit("new message", message)
  );

  socket.on("login", (userId: ObjectId) => {
    onlineUser.push(userId);
    console.log("onlineUser");
    console.log(onlineUser);
    console.log(userId);
    console.log("onlineUser");

    socket.emit("online", onlineUser);
  });
  socket.on("logout", (userId: ObjectId) => {
    onlineUser = onlineUser.filter((user) => {
      return user !== userId;
    });
    console.log(onlineUser);

    socket.emit("online", onlineUser);
  });
});

server.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
  connectDB();

  swaggerDocs(app, Number(port));
});
