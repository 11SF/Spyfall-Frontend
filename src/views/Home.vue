<template>
  <div class="h-screen flex justify-center items-center">
    <button class="absolute z-50 top-0 right-0 m-5 text-white">
      <a href="https://github.com/11SF">Github</a>
    </button>
    <div class="w-full absolute z-50">
      <div class="w-5/6 md:w-4/6 xl:w-3/6 mx-auto">
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
        <div class="grid grid-cols-6 h-12 rounded-3xl shadow-xl bg-white">
          <input
            class="col-span-3 sm:col-span-4 px-8 font-light rounded-3xl focus:outline-none"
            placeholder="token 5 หลัก"
          />
          <button
            class="px-8 h-full col-span-3 sm:col-span-2 text-md rounded-3xl hover:bg-[#FEC260] shadow-inner bg-gradient-to-tr from-[#ff9253df] to-[#ffd143] hover:bg-gradient-to-bl hover:from-[#5961df] hover:to-[#f574b9] transition duration-300 ease-in-out hover:scale-x-110 hover:text-white"
          >
            เข้าร่วม
          </button>
        </div>
        <div class="w-full mt-12">
          <div
            class="mx-auto w-fit transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 inline mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p
              class="underline underline-offset-4 inline"
              @click="$router.push('/room')"
            >
              สร้างห้อง
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <img
        class="absolute w-full h-full max-w-3xl object-none rounded-2xlorigin-center transition ease-in-out duration-300 hover:scale-105 hover:skew-y-3 animate-none"
        :src="bgPicture" v-if="bgPicture" /> -->
    <button
      class="absolute z-50 bottom-0 left-0 m-4 px-3 py-1 rounded-2xl bg-white text-md hover:bg-[#FEC260] shadow-md ease-out duration-300"
      @click="pushRoute('/add-location')"
    >
      อยากช่วยเราเพิ่มสถานที่มั้ย กดตรงนี้เลยย
    </button>
    <p
      class="absolute z-50 bottom-0 right-0 m-5 text-black font-light text-xs invisible sm:visible"
    >
      Version: {{ appVersion }} | {{ apiVersion }}
    </p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="w-full absolute top-0 z-0"
    >
      <path
        fill="#2a0944"
        fill-opacity="1"
        d="M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,160C840,171,960,149,1080,170.7C1200,192,1320,256,1380,288L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      ></path>
    </svg>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full absolute bottom-0 z-0">
      <path fill="#2a0944" fill-opacity="1"
        d="M0,64L80,69.3C160,75,320,85,480,122.7C640,160,800,224,960,218.7C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
      </path>
    </svg> -->
  </div>
</template>
<script>
import axios from "axios";
import { storeToRefs } from "pinia";
import { getVersion } from "../appVersion";
import { useLocationStore } from "../stores/locationStore";
import { usePlayerStore } from "../stores/playerStore";
import { axiosClient } from "../utility/axios";

export default {
  setup() {
    const locationStore = useLocationStore();
    const playerStore = usePlayerStore();
    const { getPlayerInfo } = storeToRefs(playerStore);

    return {
      locationStore,
      playerStore,
      getPlayerInfo
    };
  },
  data() {
    return {
      apiVersion: "loading",
      appVersion: getVersion(),
      bgPicture: null,
      showTokenForm: false,
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
        let result = await axios.get("https://aws.random.cat/meow");
        this.bgPicture = result.data.file;
      } catch (err) {
        return null;
      }
    },
  },
  async created() {
    if (!this.getPlayerInfo.name) {
      let isFoundUser = await this.playerStore.fetchPlayerInfo();
      if (!isFoundUser) {
        return this.$router.push("/create-name");
      }
    }
    await this.fetchApiVersion();
    // await this.fetchCuteCat();
  },
};
</script>
<style></style>
