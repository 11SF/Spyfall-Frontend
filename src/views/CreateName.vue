<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="absolute top-40">
      <h1 class="text-5xl">ตั้งชื่อของคุณ</h1>
    </div>
    <div
      class="w-4/6 h-18 mx-auto grid grid-cols-1 gap-4 justify-center md:w-2/6 md:grid-cols-6"
    >
      <input
        class="h-full border-solid border-2 px-4 py-2 rounded-xl md:col-span-4"
        type="text"
        placeholder="anonymous"
        v-model="name"
      />

      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-xl md:col-span-2 disabled:opacity-75 disabled:bg-gray-500"
        :disabled="!isValid"
        @click="submit"
      >
        ยืนยัน
      </button>
    </div>
  </div>
</template>
<script>
import { usePlayerStore } from "../stores/playerStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const playerStore = usePlayerStore();
    const { getPlayerInfo } = storeToRefs(playerStore);
    const { savePlayerInfo } = usePlayerStore();

    return {
      savePlayerInfo,
      getPlayerInfo,
    };
  },
  data() {
    return {
      name: "",
      isValid: true,
    };
  },
  methods: {
    async submit() {
      let err = await this.savePlayerInfo(this.name)
      if(!err) {
        this.$router.back()
      }
    }
  },

};
</script>
<style lang="css"></style>

<!-- w-2/6 h-18 mx-auto grid grid-cols-6 gap-4  -->
