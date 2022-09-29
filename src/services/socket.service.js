import { io } from "socket.io-client";
import { ClientError } from "../utility/error";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://127.0.0.1:3000");

    // this.socket.on("ROOM:SYS-MESSAGE", function (data) {
    //   // socketResponse = data;
    //   console.log(data);
    //   console.log("socket");
    // });
  }

  async createRoom(name, ownerId, roundTime, mode, numOfSpy) {
    try {
      let payload = {
        name,
        ownerId,
        roundTime,
        players: [
          {
            id: ownerId,
          },
        ],
        mode,
        numOfSpy,
      };
      await this.socket.emit("OWNER:CREATE-ROOM", payload);
    } catch (err) {
      return ClientError(2000, err);
    }
  }

  async joinRoom(playerId, roomToken) {
    try {
      let payload = {
        playerId,
        roomToken,
      };
      await this.socket.emit("PLAYER:JOIN-ROOM", payload);
    } catch (err) {
      return ClientError(2000, err);
    }
  }

  async updateSetting(roomObjectSocket) {
    try {
      await this.socket.emit("OWNER:SETTING", roomObjectSocket);
    } catch (err) {
      return ClientError(2000, err);
    }
  }

  async closeRoom(roomId) {
    let payload = {
      roomId,
    };
    try {
      await this.socket.emit("OWNER:CLOSE-ROOM"), payload;
    } catch (err) {
      return ClientError(2000, err);
    }
  }

  async handleEvent(eventName) {
    let result = null;
    await this.socket.on(eventName, (data) => {
      result = data;
    });
    return {
      eventName,
      response: result,
    };
  }

  async disconnect(roomObject) {
    try {
      this.socket.disconnect(roomObject);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new SocketioService();
