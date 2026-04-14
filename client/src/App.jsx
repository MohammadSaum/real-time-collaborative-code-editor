import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      // join a room
      const roomId = "room-1";
      socket.emit("join-room", roomId);
    });

    socket.on("user-joined", (userId) => {
      console.log("New user joined:", userId);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Room System Ready</h1>
    </div>
  );
}

export default App;