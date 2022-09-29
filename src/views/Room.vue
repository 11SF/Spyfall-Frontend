<template>
  <div class="w-full h-fit xl:h-screen py-20 text-white root">
    <div
      class="mx-auto w-fit h-fit text-4xl flex justify-between rounded-3xl bg-white overflow-hidden"
    >
      <p class="py-6 px-5 bg-[#FF8700] rounded-3xl">{{ roomStore.getCode }}</p>
      <button
        class="text-black px-5 xl:px-0 xl:text-white xl:pt-5 xl:hover:px-5 xl:hover:pt-0 xl:hover:text-black duration-150 ease-in-out flex justify-center items-center"
        @click="handleLeaveRoomBtn"
      >
        <div class="w-fit mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="w-6 h-6 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <p class="text-sm">ออก</p>
        </div>
      </button>
    </div>

    <!-- Main -->
    <div
      class="w-5/6 h-5/6 mx-auto mt-12 grid row-span-3 xl:grid-cols-12 text-black"
    >
      <!-- Col 1 -->
      <div
        class="px-2 xl:px-10 py-10 col-span-6 grid grid-rows-6 backdrop-blur-sm bg-white/70 rounded-t-3xl xl:rounded-r-none xl:rounded-l-3xl"
      >
        <div
          class="row-span-1 flex flex-col justify-center xl:flex-row xl:justify-between text-xs sm:text-lg"
          v-if="roomStore.getIsOwner"
        >
          <div class="mx-auto xl:mx-0 mb-3">
            <button
              :class="getClassModeSelectBtn().left"
              class="px-4 py-2 shadow-inner"
              @click="handleModeSelected(0)"
            >
              โหมดปกติ
            </button>
            <button
              :class="getClassModeSelectBtn().right"
              class="px-4 py-2 shadow-inner"
              @click="handleModeSelected(1)"
            >
              โหมดคนหลงทาง
            </button>
          </div>

          <div class="w-fit mx-auto xl:mx-0">
            <div
              class="w-fit h-fit mx-auto xl:mx-0 bg-white flex rounded-3xl shadow-inner overflow-hidden mb-2"
            >
              <p class="px-4 py-2 font-bold">เวลา</p>
              <select class="text-center" v-model="roomStore.roundTime">
                <option v-for="item in timeData">
                  {{ item }}
                </option>
              </select>
              <p class="px-4 py-2 font-bold">นาที</p>
            </div>
            <div
              class="w-full h-fit row-span-1 mx-auto bg-white rounded-3xl shadow-inner overflow-hidden flex justify-between"
            >
              <p class="px-4 py-2 font-bold">Spy</p>
              <select class="text-center" v-model="roomStore.numOfSpy">
                <option v-for="item in getSpyPosible()">
                  {{ item }}
                </option>
              </select>
              <p class="px-4 py-2 font-bold">คน</p>
            </div>
          </div>
        </div>
        <div class="row-span-1 flex justify-between" v-else>
          <p class="text-left text-xl font-bold">โหมดคนหลงทาง</p>
          <p class="text-right text-xl font-bold">เวลา 8.00 นาที</p>
        </div>

        <!-- main area -->
        <!-- Waiting Room -->
        <div
          class="mx-auto items-center row-span-4 h-full flex-block grid grid-rows-6"
          v-if="false"
        >
          <p class="text-9xl text-center row-span-3">⏳</p>
          <p class="text-3xl font-bold text-center row-span-1">รอผู้เล่น</p>
          <p class="text-sm font-normal text-center row-span-1 text-ellipsis">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, ea
            fuga tenetur nostrum natus officia vero magni qui alias, doloremque
            sequi porro aspernatur eum quas quasi inventore necessitatibus esse
            soluta!
          </p>
        </div>
        <!-- Started Game -->
        <div
          class="mx-auto items-center row-span-4 h-full flex-block grid grid-rows-6"
          v-else
        >
          <p class="text-9xl text-center row-span-3">😀</p>
          <p class="text-3xl font-bold text-center row-span-1">สถานีตำรวจ</p>
          <p class="text-xl font-bold text-center row-span-1">( ตำรวจ )</p>
        </div>

        <!-- btn area -->
        <!-- Waiting Room -->
        <div class="row-span-1 mx-auto">
          <button
            class="text-white px-20 py-4 rounded-3xl mt-10 bg-gradient-to-tr from-[#1e0253] to-[#c637a0] shadow-inner ease-in-out duration-300 delay-75 animate-bounce hover:animate-none"
            v-if="roomStore.getIsOwner"
          >
            เริ่มเกม
          </button>
        </div>
      </div>

      <!-- Col 2 -->
      <div
        class="h-fit xl:h-full px-4 py-10 col-span-6 xl:col-span-3 bg-white grid grid-cols-6 grid-rows-6"
      >
        <nav class="text-xl font-bold col-span-6 xl:col-span-6 row-span-1">
          <p class="text-center xl:text-left">รายชื่อผู้เล่น</p>
        </nav>
        <div
          class="w-full h-fit py-1 overflow-auto hover:overflow-y-scroll no-scrollbar col-span-6 sm:col-span-4 xl:col-span-6 row-span-3 sm:row-span-5 xl:row-span-3"
        >
          <PlayerPanel
            class="max-h-72"
            :players="getPlayerList"
            :edit="roomStore.getIsOwner"
          />
        </div>

        <div
          class="flex flex-col items-start justify-end col-span-6 sm:col-span-2 xl:col-span-6 row-span-2 sm:row-span-5 xl:row-span-2"
        >
          <p class="text-black/40">
            <span class="text-red-500/40">Room 👈</span>
            {{ "Test 1" }} เข้ามาแล้ววววว
          </p>
          <p class="text-black/70">
            <span class="text-red-500/40">Room 👈</span>
            {{ "Test 1" }} เข้ามาแล้ววววว
          </p>
          <p>
            <span class="text-red-500">Room 👈</span>
            {{ "Test 1" }} เข้ามาแล้ววววว
          </p>
        </div>
      </div>

      <!-- Col 3 -->
      <!-- <div class="h-full px-4 py-10 col-span-3 rounded-r-3xl bg-white"> -->
      <div
        class="h-fit xl:h-full px-4 py-10 col-span-6 xl:col-span-3 rounded-b-3xl xl:rounded-r-3xl xl:rounded-bl-none bg-white grid grid-rows-6"
      >
        <nav class="row-span-1 text-xl font-bold">
          <p class="text-center xl:text-left">สถานที่ทั้งหมด</p>
        </nav>
        <div
          class="w-full py-1 row-span-5 max-h-96 overflow-auto hover:overflow-y-scroll no-scrollbar"
        >
          <LocationPanel class="" :edit="roomStore.getIsOwner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerPanel from "../components/playerPanel.vue";
import LocationList from "../components/LocationList.vue";
import { useLocationStore } from "../stores/locationStore";
import { storeToRefs } from "pinia";
import LocationPanel from "../components/LocationPanel.vue";
import { useRoomStore } from "../stores/roomStore";
import { usePlayerStore } from "../stores/playerStore";
import SocketService from "../services/socket.service";
import { buildRoomObjectModel } from "../adapter/room.adapter";

export default {
  setup() {
    const locationStore = useLocationStore();
    const { getLocationList } = storeToRefs(locationStore);
    const playerStore = usePlayerStore();
    const { getPlayerInfo } = storeToRefs(playerStore);
    const roomStore = useRoomStore();
    const {
      getNumOfSpy,
      getMode,
      getRoundTime,
      getPlayerList,
      getInfoForSocket,
    } = storeToRefs(roomStore);
    // let socketResponse = null

    SocketService.setupSocketConnection();

    return {
      locationStore,
      getLocationList,
      roomStore,
      playerStore,
      getPlayerInfo,
      getNumOfSpy,
      getMode,
      getRoundTime,
      SocketService,
      getPlayerList,
      getInfoForSocket,
      // socketResponse
    };
  },
  props: ["type"],
  data() {
    return {
      playerList: [
        {
          name: "11SF",
        },
        {
          name: "Rose",
        },
        {
          name: "pployyss",
        },
        {
          name: "mentosandmentos",
        },
        {
          name: "SOSO",
        },
        {
          name: "jay",
        },
        {
          name: "ผู้เล่น",
        },
        {
          name: "anonymous",
        },
        {
          name: "asdawfszdf",
        },
        {
          name: "11SF",
        },
        {
          name: "Rose",
        },
        {
          name: "pployyss",
        },
        {
          name: "mentosandmentos",
        },
        {
          name: "SOSO",
        },
        {
          name: "jay",
        },
        {
          name: "ผู้เล่น",
        },
        {
          name: "anonymous",
        },
        {
          name: "asdawfszdf",
        },
      ],
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
      modeSelected: 0,
      roundTime: "8.00",
      timeData: ["8.00", "7.00", "6.00", "5.00", "4.00", "3.00", "2.00"],
      spyTotal: 1,
      socketResponse: null,
    };
  },
  components: {
    PlayerPanel,
    LocationList,
    LocationPanel,
  },
  methods: {
    getClassModeSelectBtn() {
      if (this.modeSelected === 0) {
        return {
          left: "rounded-l-3xl font-bold bg-green-500",
          right: "rounded-r-3xl bg-white",
        };
      } else {
        return {
          left: "rounded-l-3xl bg-white",
          right: "rounded-r-3xl font-bold bg-green-500",
        };
      }
    },
    setRoundTime(input) {
      let time = parseInt(this.roundTime);
      console.log(time);
    },
    handleLeaveRoomBtn() {
      this.$router.push("/");
    },
    handleModeSelected(mode) {
      this.modeSelected = mode;
      this.roomStore.setMode(mode);
    },
    exitRoom() {
      if (this.roomStore.isOwner) {
        if (alert("ต้องการปิดห้องใช่มั้ยยย")) {
          this.roomStore.setOwner(false);
        }
      }
    },
    getSpyPosible() {
      if (!this.roomStore.playerList) {
        return;
      }
      let result = Math.ceil(this.roomStore.playerList.length / 3);
      if (result < 1) {
        result = 1;
      }
      return result;
    },
  },
  async created() {
    let vm = this;
    if (!this.getPlayerInfo.name) {
      let isFoundUser = await this.playerStore.fetchPlayerInfo();
      if (!isFoundUser) {
        return this.$router.push("/create-name");
      }
    }
    await this.locationStore.fetchLocation();
    this.roomStore.setLocation(this.locationStore.getLocationList);
    // this.SocketService.setupSocketConnection();
    if (this.roomStore.getOwner) {
      await SocketService.createRoom(
        this.getPlayerInfo.name,
        this.getPlayerInfo.id,
        this.getRoundTime,
        this.getMode,
        this.getNumOfSpy
      );
    } else {
      if (!this.roomStore.getCode) {
        let isFound = await this.roomStore.fetchUserRoom(
          this.playerStore.getPlayerInfo.id
        );
        if (isFound) {
          await SocketService.joinRoom(
            this.getPlayerInfo.id,
            this.roomStore.getCode
          );
        } else {
          this.$router.push("/");
        }
      } else {
        await SocketService.joinRoom(
          this.getPlayerInfo.id,
          this.roomStore.getCode
        );
      }
    }
    // this.SocketService.socket.on("ROOM:SYS-MESSAGE", function (data) {
    //   vm.socketResponse = data;
    //   console.log("socket");
    // });
    // this.roomStore.fetchRoom(this.roomStore.getCode)
  },
  mounted() {
    let vm = this;
    this.SocketService.setupSocketConnection();
    this.SocketService.socket.on("ROOM:SYS-MESSAGE", function (data) {
      vm.socketResponse = data;
    });
    this.SocketService.socket.on("ROOM:SYNC-SETTING", function (data) {
      vm.socketResponse = data;
    });
  },
  watch: {
    socketResponse(newSocketResponse) {
      console.log(newSocketResponse);
      let roomObject = null;
      if (newSocketResponse?.meta.code === 1000) {
        switch (newSocketResponse.commandEvent) {
          case "OWNER:CREATE-ROOM":
            roomObject = buildRoomObjectModel(newSocketResponse);
            this.roomStore.setRoomDataFromSocket(roomObject);
            break;
          case "PLAYER:JOIN-ROOM":
            console.log("PLAYER:JOIN-ROOM");
            roomObject = buildRoomObjectModel(newSocketResponse.data[0]);
            this.roomStore.setRoomDataFromSocket(roomObject);
            break;
          default:
            break;
        }
      }
    },
    getInfoForSocket(oldInfoForSockett, newInfoForSockett) {
      console.log(oldInfoForSockett);
      if (oldInfoForSockett) {
        console.log("asd");
        // SocketService.updateSetting(this.getInfoForSocket);
        console.log(this.getInfoForSocket);
      }
      // console.log(this.getLocationList);
    },
  },
};
</script>
<style lang="css">
.root {
  background-image: url("../../public/layered-waves-haikei.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: black;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
