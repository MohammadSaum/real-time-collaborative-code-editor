import app from './app.js'
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 5000

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`User ${socket.id} joined room ${roomId}`);

    // notify others in room
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});