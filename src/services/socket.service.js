import { io } from "socket.io-client";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://127.0.0.1:3000");
  }

  async createRoom(name, ownerId, roundTime, mode, numOfSpy) {
    try {
      let payload = {
        name,
        ownerId,
        roundTime,
        mode,
        numOfSpy,
      };
      let result = await this.socket.emit("OWNER:CREATE-ROOM", payload);
      console.log(result);
    } catch (err) {
        console.log(err);
    }
  }
}

export default new SocketioService();
