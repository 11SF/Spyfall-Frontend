import { defineStore } from "pinia";
import { axiosClient } from "../utility/axios";

export const usePlayerStore = defineStore("playerStore", {
  state: () => {
    return {
      playerInfo: {
        name: null,
        id: null,
      },
    };
  },

  getters: {
    getPlayerInfo: (state) => {
      return state.playerInfo;
    },
  },
  actions: {
    async fetchPlayerInfo() {
      let id = localStorage.getItem("playerId");
      if (!id) {
        this.playerInfo.id = null;
        this.playerInfo.name = null;
        return false;
      }
      let result = await axiosClient("get", "/player", {
        id,
      });
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return false
      }
      console.log(result);
      this.playerInfo.id = result.data[0]._id;
      this.playerInfo.name = result.data[0].name;
      return true;
    },
    async savePlayerInfo(name) {
      let result = await axiosClient("post", "/player", null, {
        name,
        socketId: "mock",
      });
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return result.meta;
      }
      this.playerInfo.id = result.data._id;
      this.playerInfo.name = result.data.name;
      localStorage.setItem("playerId", result.data._id);
      return null;
    },
  },
});
