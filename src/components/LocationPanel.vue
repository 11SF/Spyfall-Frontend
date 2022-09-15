<template>
  <div class="w-full flex flex-wrap gap-1 xl:w-full xl:flex-none">
    <div
      v-for="(item, index) in sortList(getLocationList)"
      :class="getPanelClass(index)"
      class="h-fit w-fit m-1 px-6 py-2 rounded-3xl shadow-lg cursor-pointer ease-in-out duration-300 active:scale-110 select-none relative"
      @click="handleClick(index)"
    >
      {{ item.name }}
      <button
        class="absolute -top-1 -right-1 text-black hover:text-white bg-white rounded-full hover:bg-gradient-to-tr from-[#c637a0] to-[#1e0253] hover:scale-125 duration-100 ease-in-out"
        @click="handleDisable(index)"
        v-if="edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
          v-if="!disableList[index]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 rotate-45"
          v-else
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import { useLocationStore } from "../stores/locationStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const locationStore = useLocationStore();
    const { getLocationList } = storeToRefs(locationStore);
    return {
      locationStore,
      getLocationList,
    };
  },
  props: ["edit"],
  data() {
    return {
      markList: [],
      disableList: [],
    };
  },
  methods: {
    handleClick(index) {
      if (this.markList[index]) {
        this.markList[index] = !this.markList[index];
      } else {
        this.markList[index] = true;
      }
    },
    getPanelClass(index) {
      if (this.edit) {
        if (this.disableList[index]) {
          return "bg-gray-300 text-black/50";
        }
      } else {
        if (this.markList[index]) {
          return "rounded-full shadow-inner bg-gradient-to-tr from-[#c637a0] to-[#1e0253] text-white animate-pulse";
        }
      }
      return "rounded-full shadow-inner bg-gradient-to-tr from-[#ff9253df] to-[#ffd143]";
    },
    sortList(list) {
      let result = [];
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (list[j].name.length === i + 1) {
            result.push(list[j]);
          }
        }
      }
      return result;
    },
    handleDisable(index) {
      if (this.disableList[index]) {
        this.disableList[index] = !this.disableList[index];
      } else {
        this.disableList[index] = true;
      }
    },
  },
  created() {
    // this.locationStore.fetchLocation()
  },
};
</script>
<style lang=""></style>
