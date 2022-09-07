import { defineStore } from "pinia";
import { buildApiResponseToLocationModelArray, buildApiResponseToLocationModel } from "../adapter/buildApiResponseToLocationModel";
import { axiosClient } from "../utility/axios";
import { buildMetaResponse, buildResponse } from "../utility/response";

export const useLocationStore = defineStore("LocationStore", {
  state: () => {
    return {
      locationList: [],
      newLocation: null,
      createLocationStatus: false,
      isFetchingLocation: true,
      roles: [],
      confirmName: false,
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    getRoles: (state) => {
      return state.roles;
    },
    getNewLocation: (state) => {
      return state.newLocation;
    },
    getLocationList: (state) => {
      return state.locationList;
    },
    getFetchingLocationStatus: (state) => {
      return state.isFetchingLocation;
    },
    getConfirmName: (state) => {
      return state.confirmName;
    },
    getCreateLocationStatus: (state) => {
      return state.createLocationStatus;
    },
  },
  actions: {
    addRole(name, description) {
      let roleObject = {
        name,
        description: description ? description : "",
      };
      this.newLocation.roles.push(roleObject);
    },
    removeRole(reqIndex) {
      this.roles = this.roles.filter((_, index) => index != reqIndex);
    },
    async fetchLocation(name) {
      this.isFetchingLocation = true;
      let result = await axiosClient(
        "get",
        "/location",
        name ? { name } : null,
        null,
        null
      );
      if (result.meta.code != 1000) {
        alert(result.meta.error);
        console.log(result.meta.message);
        return;
      }
      this.locationList = buildApiResponseToLocationModelArray(result);
      this.isFetchingLocation = false;
    },
    async createLocation(name, createBy) {
      let result = await axiosClient("post", "/location", null, {
        name,
        createBy,
      });
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return result.meta
      }
      this.newLocation = buildApiResponseToLocationModel(result);
      this.createLocationStatus = true;
      return result.meta
    },
    async rollbackLocation() {
      console.log(this.newLocation);
      let result = await axiosClient(
        "delete",
        "/location",
        null,
        this.newLocation,
        null
      );
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return;
      }
      this.clearNewLocation()
      return result.meta
    },
    clearNewLocation() {
      this.newLocation = null
      this.createLocationStatus = false
    },
    setConfirmName(status) {
      if (status instanceof Boolean) {
        this.confirmName = status;
      }
    },
  },
});

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot));
//   }
