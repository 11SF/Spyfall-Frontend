import { defineStore } from "pinia";
import { axiosClient } from "../utility/axios";

export const useRoomStore = defineStore("roomStore", {
  state: () => {
    return {
      code: null,
      isOwner: false,
      roundTime: "8.00",
      mode: 0,
      numOfSpy: 1,
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
      return {
        code: state.code,
        roundTime: state.roundTime,
        numOfSpy: state.numOfSpy,
        mode: state.mode,
        location: location,
      };
    },
    // getIsOwner: (state) => {
    //   let localId = localStorage.getItem("playerId")
    //   if(localId === )
    // }
  },
  actions: {
    async fetchRoom() {
      let result = await axiosClient("get", "/room", { code : state.code}, null, null)
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
    // setLocationState(reqLocation) {},
    setNumOfSpy(value) {
      this.numOfSpy = value;
    },
    setRoundTime(value) {
      this.roundTime = value;
    },
    setMode(value) {
      this.mode = value;
    },
  },
});
