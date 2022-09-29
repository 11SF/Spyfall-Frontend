<template>
  <div class="flex flex-row flex-wrap gap-1">
    <div
      v-for="(item, index) in players"
      :class="getPanelClass(index)"
      class="cursor-pointer ease-in-out duration-300 active:scale-125 relative"
      @click="handleClick(index)"
    >
      <p class="flex items-center cursor-pointer select-none">
        {{ item.name }}
      </p>
      <button
      v-if="edit"
        class="absolute -top-1 -right-1 text-black hover:text-white bg-white rounded-full hover:bg-gradient-to-tr from-[#c637a0] to-[#1e0253] hover:scale-125 duration-100 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
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
export default {
  props: ["players", "edit"],
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
