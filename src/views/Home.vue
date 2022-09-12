<template>
  <div class="h-screen flex items-center">
    <button class="absolute top-0 right-0 m-5 text-white">
      <a href="https://github.com/11SF">Github</a>
    </button>
    <div class="w-1/2">
      <div class="w-3/6 mx-auto">
        <h1 class="text-8xl font-bold text-center">Spyfall</h1>
        <div class="my-10">
          <div class="">
            <p class="text-5xl font-normal">"</p>
          </div>
          <p class="my-5 mx-10 text-center align-middle animate-pulse">
            จับให้ได้ ว่าใครตอแหล
          </p>
          <p class="text-right text-5xl font-normal pt-5">"</p>
        </div>
        <div class="flex justify-between">
          <button
            class="px-8 py-2 rounded-2xl text-[24px] shadow-md bg-[#FEC260]"
          >
            สร้างห้อง
          </button>
          <button
            class="px-8 py-2 rounded-2xl text-[24px] shadow-md border-2 border-[#FEC260]"
          >
            เข้าร่วมเกม
          </button>
        </div>
      </div>
    </div>
    <div class="h-full w-1/2 py-24 bg-[#2A0944] flex justify-center items-center">
      <img class="w-full h-full max-w-3xl object-none rounded-2xlorigin-center transition ease-in-out duration-300 hover:scale-105 hover:skew-y-3 animate-none" :src="bgPicture" v-if="bgPicture" />
    </div>
    <button
      class="absolute bottom-0 left-0 m-4 px-3 py-1 rounded-2xl text-md hover:bg-[#FEC260] shadow-md ease-out duration-300"
      @click="pushRoute('/add-location')"
    >
      อยากช่วยเราเพิ่มสถานที่มั้ย กดตรงนี้เลยย
    </button>
    <p class="absolute bottom-0 right-0 m-5 text-white font-light text-xs">
      Version: {{ appVersion }} | {{ apiVersion }}
    </p>
  </div>
</template>
<script>
import axios from "axios";
import { getVersion } from "../appVersion";
import { axiosClient } from "../utility/axios";

export default {
  data() {
    return {
      apiVersion: "loading",
      appVersion: getVersion(),
      bgPicture: null
    };
  },
  methods: {
    async fetchApiVersion() {
      let result = await axiosClient("get", "/version");
      if (result.meta.code != 1000) {
        this.apiVersion = "err";
        return;
      }
      console.log(result);
      this.apiVersion = result.data.version;
    },
    pushRoute(path) {
      this.$router.push(path);
    },
    async fetchCuteCat() {
      try {
        let result = await axios.get("https://aws.random.cat/meow")
        this.bgPicture = result.data.file
      } catch(err) {
        return null
      }
    }
  },
  async created() {
    await this.fetchApiVersion();
    await this.fetchCuteCat();
  },
};
</script>
<style></style>
