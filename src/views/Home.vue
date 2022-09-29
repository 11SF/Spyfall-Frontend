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
            v-model="code"
          />
          <button
            class="px-8 h-full col-span-3 sm:col-span-2 text-md rounded-3xl hover:bg-[#FEC260] shadow-inner bg-gradient-to-tr from-[#ff9253df] to-[#ffd143] hover:bg-gradient-to-bl hover:from-[#5961df] hover:to-[#f574b9] transition duration-300 ease-in-out hover:scale-x-110 hover:text-white"
            @click="joinRoom"
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

            <p class="underline underline-offset-4 inline" @click="createRoom">
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
  <TransitionRoot class="absolute z-50" appear :show="showModal" as="template">
    <Dialog as="div" @close="closeModal" class="">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                คุณกำลังอยู่ในห้องของ {{ roomStore.getName }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  ต้องการเล่นต่อที่ห้องของ {{ roomStore.getName }} หรือไม่ 🤔
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 mr-5 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="handleRoomContinue(true)"
                >
                  เล่นต่อ
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="handleRoomContinue(false)"
                >
                  ออกจากห้อง
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>
import axios from "axios";
import { storeToRefs } from "pinia";
import { getVersion } from "../appVersion";
import { useLocationStore } from "../stores/locationStore";
import { usePlayerStore } from "../stores/playerStore";
import { useRoomStore } from "../stores/roomStore";
import { axiosClient } from "../utility/axios";
import CommonModal from "../components/ShareComponents/CommonModal.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import { buildRoomObjectModel } from "../adapter/room.adapter";

export default {
  setup() {
    const locationStore = useLocationStore();
    const roomStore = useRoomStore();
    const playerStore = usePlayerStore();
    const { getPlayerInfo } = storeToRefs(playerStore);
    return {
      locationStore,
      playerStore,
      getPlayerInfo,
      roomStore,
    };
  },
  data() {
    return {
      apiVersion: "loading",
      appVersion: getVersion(),
      bgPicture: null,
      showTokenForm: false,
      isOpen: true,
      code: null,
      showModal: false,
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
    setIsOpen(value) {
      console.log(value);
      this.isOpen = value;
    },
    createRoom() {
      this.roomStore.setOwner(true);
      this.$router.push("/room");
    },
    joinRoom() {
      if (this.code) {
        this.roomStore.setOwner(false);
        // this.roomStore.setCode(this.code)
        this.roomStore.fetchRoom(this.code);
        if (this.roomStore.getCode) {
          this.$router.push("/room");
        }
      }
    },
    async handleRoomContinue(isContinue) {
      if (isContinue) {
        this.$router.push("/room");
      } else {
        if (this.roomStore.getIsOwner) {
          await this.roomStore.closeRoom();
        } else {
          await this.roomStore.leaveRoom();
        }
      }
      this.showModal = false;
    },
  },
  async created() {
    await this.fetchApiVersion();
    if (!this.getPlayerInfo.name) {
      await this.playerStore.fetchPlayerInfo();
      this.showModal = await this.roomStore.fetchUserRoom(
        this.playerStore.getPlayerInfo.id
      );
    } else {
      this.showModal = await this.roomStore.fetchUserRoom(
        this.playerStore.getPlayerInfo.id
      );
    }
    // await this.fetchCuteCat();
  },
  components: {
    CommonModal,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
  },
};
</script>
<style lang="css"></style>
