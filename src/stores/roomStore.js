import { defineStore } from "pinia";
import { axiosClient } from "../utility/axios";

export const useRoomStore = defineStore("roomStore", {
  state: () => {
    return {
      code: null,
      isOwner: false,
      roundTime: "8.00",
      mode: 0,
      playerList: null,
      myRole: null,
    };
  },

  getters: {
    
  },
  actions: {
    
  },
});
