<template>
  <div class="w-4/6 h-32 mx-auto shadow p-3 rounded">
    <span class="font-medium text-sm">ชื่อสถานที่</span>
    <div class="flex justify-between mt-2">
      <input
        class="w-4/6 border-solid border-2 px-4 py-2 mr-5 rounded-xl disabled:opacity-75"
        type="text"
        v-model="name"
        :disabled="getCreateLocationStatus"
      />
      <button
        class="w-2/6 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:opacity-75 disabled:bg-gray-500"
        :disabled="isDisableBtn || getCreateLocationStatus"
        @click="submitName"
      >
        ยืนยัน
      </button>
    </div>
    <span class="font-normal text-xs" :class="message.color">{{
      message.msg
    }}</span>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useLocationStore } from "../stores/locationStore";
import { usePlayerStore } from "../stores/playerStore";

export default {
  setup() {
    const locationStore = useLocationStore();
    const {
      getLocationList,
      getConfirmName,
      getCreateLocationStatus,
      getNewLocation,
    } = storeToRefs(locationStore);
    const { setConfirmName, createLocation, fetchLocation } =
      useLocationStore();

    const playerStore = usePlayerStore();
    const { getPlayerInfo } = storeToRefs(playerStore);

    return {
      locationStore,
      getLocationList,
      createLocation,
      getConfirmName,
      getNewLocation,
      getCreateLocationStatus,
      setConfirmName,
      fetchLocation,
      getPlayerInfo,
    };
  },
  data() {
    return {
      messageType: {
        valid: {
          meg: "สามารถใช้ชื่อสถานที่นี้ได้ 🎉",
          color: "text-green-500",
        },
        inValid: {
          msg: "ชื่อสถานที่ต้องขึ้นต้นด้วยตัวอักษรน้าาาา 😣",
          color: "text-red-700",
        },
        dupplicate: {
          msg: "มีชื่อสถานที่นี้อยู่แล้ว ลองใส่สถานที่อื่นดูนะ 🤣",
          color: "text-red-700",
        },
      },
      name: "",
      message: "",
      isDisableBtn: true,
    };
  },
  methods: {
    checkDupplicat(name) {
      for (const ln of this.getLocationList) {
        if (ln.name === name) {
          return true;
        }
      }
      return false;
    },
    async submitName() {
      let result = await this.createLocation(this.name, this.getPlayerInfo.name);
      console.log(result);
      if (result.code === 5033) {
        this.message = this.messageType.dupplicate;
        this.isDisableBtn = true;
        this.fetchLocation();
      }
    },
  },
  watch: {
    name(newName) {
      if (newName != "") {
        if (/(^[0-9])/.test(newName)) {
          this.message = this.messageType.inValid;
          this.isDisableBtn = true;
        } else if (this.checkDupplicat(newName)) {
          this.message = this.messageType.dupplicate;
          this.isDisableBtn = true;
        } else {
          this.message = "";
          this.isDisableBtn = false;
        }
      } else {
        this.message = "";
        this.isDisableBtn = true;
      }
    },
  },
};
</script>
<style lang=""></style>
