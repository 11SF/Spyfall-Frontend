<template>
  <div class="w-full h-screen py-20 text-white root absolute z-50">
    <p
      class="mx-auto w-fit px-10 py-6 text-4xl text-center rounded-3xl bg-[#FF8700]"
    >
      #TEDEV
    </p>

    <!-- Main -->
    <div
      class="w-5/6 h-5/6 mx-auto rounded-3xl mt-12 grid grid-cols-12 text-black"
    >
      <!-- Col 1 -->
      <div
        class="px-10 py-10 col-span-6 grid grid-rows-6 backdrop-blur-sm bg-white/70 rounded-l-3xl"
      >
        <div class="row-span-1 flex justify-between" v-if="true">
          <div>
            <button
              :class="getClassModeSelectBtn().left"
              class="px-4 py-2 shadow-inner"
              @click="modeSelected = 0"
            >
              โหมดปกติ
            </button>
            <button
              :class="getClassModeSelectBtn().right"
              class="px-4 py-2 shadow-inner"
              @click="modeSelected = 1"
            >
              โหมดคนหลงทาง
            </button>
          </div>
          <div
            class="w-fit h-fit bg-white flex rounded-3xl shadow-inner overflow-hidden"
          >
            <p class="px-4 py-2 font-bold">เวลา</p>
            <select v-model="roundTime">
              <option v-for="index in [8, 7, 6, 5, 4, 3, 2, 1]">
                {{ index }}.00
              </option>
            </select>
            <p class="px-4 py-2 font-bold">นาที</p>
          </div>
        </div>
        <div class="row-span-1 flex justify-between" v-else>
          <p class="text-left text-xl font-bold">โหมดคนหลงทาง</p>
          <p class="text-right text-xl font-bold">เวลา 8.00 นาที</p>
        </div>
        <div class="mx-auto items-center row-span-4 h-full flex-block">
          <p class="text-9xl text-center h-4/6 flex items-center">😀</p>
          <p class="text-3xl font-bold text-center">สถานีตำรวจ</p>
          <p class="text-xl font-bold text-center">( ตำรวจ )</p>
        </div>
        <div class="row-span-1 mx-auto">
          <button
            class="text-white px-20 py-4 rounded-3xl bg-gradient-to-tr from-[#1e0253] to-[#c637a0] shadow-inner ease-in-out duration-300 delay-75 animate-bounce hover:animate-none"
          >
            เริ่มเกม
          </button>
        </div>
      </div>

      <!-- Col 2 -->
      <div class="px-4 py-10 col-span-3 bg-white">
        <nav class="h-1/6 text-xl font-bold">
          <p>รายชื่อผู้เล่น</p>
        </nav>
        <div
          class="w-full h-4/6 overflow-auto hover:overflow-y-scroll no-scrollbar relative"
        >
          <PlayerPanel :players="playerList" class="absolute" />
        </div>
        <div class="h-1/6 flex justify-center items-end">
          <button class="w-full py-3 bg-red-600 rounded-3xl">ออกจากห้อง</button>
        </div>
      </div>

      <!-- Col 3 -->
      <div class="h-full px-4 py-10 col-span-3 rounded-r-3xl bg-white">
        <nav class="h-1/6 text-xl font-bold">
          <p>สถานที่ทั้งหมด</p>
        </nav>
        <div
          class="w-full h-5/6 overflow-auto hover:overflow-y-scroll no-scrollbar relative"
        >
          <PlayerPanel :players="locationList" class="absolute" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerPanel from "../components/playerPanel.vue";
export default {
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
          name: "beamandmestos",
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
          name: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis molestiae temporibus expedita quia ut illo sit quidem nam modi neque!",
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
    };
  },
  components: {
    PlayerPanel,
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
  },
};
</script>
<style lang="css">
.root {
  background-image: url("../../public/layered-waves-haikei.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
