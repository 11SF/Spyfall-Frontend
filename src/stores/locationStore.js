import { defineStore } from "pinia";
import {
  buildApiResponseToLocationModelArray,
  buildApiResponseToLocationModel,
  buildLocationModelToApiRequest,
} from "../adapter/location.adapter";
import { axiosClient } from "../utility/axios";
import { buildMetaResponse, buildResponse } from "../utility/response";

export const useLocationStore = defineStore("LocationStore", {
  state: () => {
    return {
      locationList: [
        {
          name: "asdasdzxc",
        },
        {
          name: "teasdardfst1",
        },
        {
          name: "czxcwfczxv",
        },
        {
          name: "zxcwevzdv",
        },
        {
          name: "zxcz",
        },
        {
          name: "czscwfsz",
        },
        {
          name: "Lorem ipsum dolor sit, amet consectetur",
        },
        {
          name: "lasdawsczxc",
        },
        {
          name: "Lorem ipsum dolor sit, amet",
        },
        {
          name: "zxcassds",
        },
        {
          name: "zxcwevzdv",
        },
        {
          name: "zxcz",
        },
        {
          name: "czscwfsz",
        },
        {
          name: "125as7d854wdaczx",
        },
        {
          name: "lasdawsczxc",
        },
        {
          name: "Lorem ipsum dolor sit, amet",
        },
        {
          name: "czxcwfczxv",
        },
        {
          name: "zxcwevzdv",
        },
        {
          name: "zxcz",
        },
        {
          name: "czscwfsz",
        },
        {
          name: "125as7d854wdaczx",
        },
        {
          name: "lasdawsczxc",
        },
        {
          name: "zxcasdf",
        },
        {
          name: "zxcassds",
        },
        {
          name: "zxcwevzdv",
        },
      ],
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
      return state.newLocation.roles;
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
    async fetchLocation(name, playerId) {
      this.isFetchingLocation = true;
      let params = {};
      if (name) {
        params.name = name;
      } else {
        params.createByPlayerId = playerId;
      }
      let result = await axiosClient("get", "/location", params, null, null);
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return false;
      }
      if (!name && !playerId) {
        this.locationList = buildApiResponseToLocationModelArray(result);
        return true;
      } else {
        let locationResponse = buildApiResponseToLocationModel(result);
        console.log(result);
        if (locationResponse) {
          // let locationResponse = buildApiResponseToLocationModel(result);
          this.newLocation = buildApiResponseToLocationModel(result);
          return true;
          // if (!locationResponse.updateDate) {
          //   this.newLocation = buildApiResponseToLocationModel(result);
          //   return true;
          // }
        }
      }
      this.isFetchingLocation = false;
      return false;
    },
    async createLocation(name, createBy, createByPlayerId) {
      let result = await axiosClient("post", "/location", null, {
        name,
        createBy,
        createByPlayerId,
      });
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return result.meta;
      }
      this.newLocation = buildLocationModelToApiRequest(result);
      this.createLocationStatus = true;
      return result.meta;
    },
    async rollbackLocation() {
      console.log(this.newLocation);
      if (this.newLocation) {
        if (this.newLocation.updateDate) {
          return;
        }
      }
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
      this.clearNewLocation();
      return result.meta;
    },
    async saveRoles() {
      let result = await axiosClient(
        "put",
        "/location",
        null,
        this.getNewLocation
      );
      if (result.meta.code != 1000) {
        // alert(result.meta.error);
        console.log(result.meta.message);
        return result.meta;
      }
      let newLocationResponse = buildApiResponseToLocationModel(result);
      this.locationList.push(newLocationResponse);
      this.newLocation = null;
      return null;
    },
    clearNewLocation() {
      this.newLocation = null;
      this.createLocationStatus = false;
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
