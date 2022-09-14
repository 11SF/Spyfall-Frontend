<template>
  <div class="flex flex-row flex-wrap gap-1">
    <div
      v-for="(item, index) in players"
      :class="getPanelClass(index)"
      class="cursor-pointer ease-in-out duration-300 active:scale-125"
      @click="handleClick(index)"
    >
      <p class="text-xl flex items-center cursor-pointer select-none">
        {{ item.name }}
      </p>
      <!-- <div>
          <button>Kick</button>
        </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["players"],
  data() {
    return {
      markList: {},
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
      if (this.markList[index]) {
        return "w-fit h-fit px-6 py-2 rounded-full shadow-inner m-1 bg-gradient-to-tr from-[#c637a0] to-[#1e0253] text-white animate-pulse";
      } else {
        return "w-fit h-fit px-6 py-2 rounded-full shadow-inner m-1 bg-gradient-to-tr from-[#ff9253df] to-[#ffd143]";
      }
    },
  },
};
</script>
<style lang="css"></style>
<!-- #1e0253
#c637a0 -->
