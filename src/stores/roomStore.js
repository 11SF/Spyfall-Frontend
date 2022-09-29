import { defineStore } from "pinia";
import { buildRoomObjectModel } from "../adapter/room.adapter";
import { axiosClient } from "../utility/axios";

export const useRoomStore = defineStore("roomStore", {
  state: () => {
    return {
      roomId: null,
      name: null,
      code: null,
      isOwner: false,
      ownerId: null,
      roundTime: "8.00",
      mode: "0",
      numOfSpy: "1",
      playerList: null,
      myRole: null,
      location: null,
    };
  },

  getters: {
    getRoomLocation: (state) => {
      return state.location;
    },
    getNumOfSpy: (state) => {
      return state.numOfSpy;
    },
    getRoundTime: (state) => {
      return state.roundTime;
    },
    getMode: (state) => {
      return state.mode;
    },
    getOwner: (state) => {
      return state.isOwner;
    },
    getLocationForSocket: (state) => {
      try {
        let result = [];
        for (const i of state.location) {
          result.push({
            id: i.id,
            name: i.name,
            state: i.state,
          });
        }
        return result;
      } catch (err) {
        return [];
      }
    },
    getInfoForSocket: (state) => {
      let location = [];
      try {
        for (const i of state.location) {
          location.push({
            id: i.id,
            name: i.name,
            state: i.state,
          });
        }
      } catch (err) {
        return null;
      }
      if(!state.roomId) {
        return null
      }
      return {
        id: state.roomId,
        code: state.code,
        roundTime: state.roundTime,
        numOfSpy: state.numOfSpy,
        mode: state.mode,
        location: location,
      };
    },
    getName: (state) => {
      return state.name;
    },
    getCode: (state) => {
      return state.code;
    },
    getPlayerList: (state) => {
      return state.playerList;
    },
    getIsOwner: (state) => {
      let localId = localStorage.getItem("playerId");
      if (localId === state.ownerId) {
        return true;
      } else {
        return false;
      }
    },
  },
  actions: {
    async fetchRoom(code) {
      let result = await axiosClient(
        "get",
        "/room",
        { code: code },
        null,
        null
      );
      if (result.meta.code === 1999) {
        return;
      }
      if (result) {
        let roomObject = buildRoomObjectModel(result.data[0]);
        this.setRoomDataFromSocket(roomObject);
      }
    },
    async fetchUserRoom(playerId) {
      let result = await axiosClient("get", "/room/getUserRoom", {
        playerId,
      });
      if (result.meta.code === 1000) {
        let roomObject = buildRoomObjectModel(result.data[0]);
        this.setRoomDataFromSocket(roomObject);
        return true;
      }
      return false;
    },
    async closeRoom() {
      let result = await axiosClient("delete", "/room", null, {
        id: this.roomId,
      });
      if (result.meta.code !== 1000) {
        console.log(result);
      }
    },
    async leaveRoom() {
      let players = [];
      this.playerList.map((i) => {
        console.log(i.id);
        if (i.id !== localStorage.getItem("playerId")) {
          players.push(i);
        }
      });
      let result = await axiosClient("put", "/room", null, {
        id: this.roomId,
        code: this.code,
        mode: this.mode,
        name: this.name,
        ownerId: this.ownerId,
        players: players,
        roundTime: this.roundTime,
        location: this.location,
        numOfSpy: this.numOfSpy,
      });
      if (result.meta.code !== 1000) {
        console.log(result);
      }
    },
    setRoomDataFromSocket(roomObject) {
      this.roomId = roomObject.id ? roomObject.id : this.roomId;
      this.name = roomObject.model.name ? roomObject.model.name : this.name;
      this.code = roomObject.model.code ?? this.code;
      this.ownerId = roomObject.model.ownerId ?? this.ownerId;
      this.roundTime = roomObject.model.roundTime ?? this.roundTime;
      this.mode = roomObject.model.mode ?? this.mode;
      this.numOfSpy = roomObject.model.numOfSpy ?? this.numOfSpy;
      this.playerList = roomObject.model.players ?? this.playerList;
      this.location = roomObject.model.location ?? this.location;
    },
    setLocation(location) {
      this.location = [];
      for (const i of location) {
        i["state"] = true;
        this.location.push(i);
      }
    },
    filterLocation(locationReq) {
      for (const index in this.location) {
        if (locationReq.id === this.location[index].id) {
          this.location[index].state = !this.location[index].state;
          break;
        }
      }
    },
    setNumOfSpy(value) {
      this.numOfSpy = value;
    },
    setRoundTime(value) {
      this.roundTime = value;
    },
    setMode(value) {
      this.mode = value;
    },
    setOwner(value) {
      this.isOwner = value;
    },
    setCode(value) {
      this.code = value;
    },
  },
});
