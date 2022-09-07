<template>
  <div class="w-4/6 mx-auto shadow p-3 rounded">
    <div class="mt-2">
      <div class="block">
        <span class="block mb-1">ชื่ออาชีพ</span>
        <input
          class="w-full border-solid border-2 px-4 py-2 mr-5 rounded-xl"
          type="text"
          v-model="name"
        />
      </div>

      <div class="block mt-4">
        <span class="block mb-1"
          >คำอธิบายสั้นๆ (ใส่ก็ดี ถ้าเป็นอาชีพแปลกๆ 555)</span
        >
        <input
          class="w-full border-solid border-2 px-4 py-2 mr-5 rounded-xl"
          type="text"
          v-model="description"
        />
      </div>

      <button
        class="mt-5 w-full bg-blue-500 text-white px-4 py-2 rounded-xl disabled:opacity-75 disabled:bg-gray-500"
        :disabled="!isValid"
        @click="addRoleToStore"
      >
        +
      </button>
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useLocationStore } from "../stores/locationStore";

export default {
  setup() {
    const locationStore = useLocationStore();
    const { getNewLocation } = storeToRefs(locationStore);
    const { addRole } = useLocationStore();

    return {
      locationStore,
      // getRoles,
      addRole,
    };
  },
  data() {
    return {
      isValid: false,
      name: "",
      description: "",
    };
  },
  methods: {
    setValid(bool) {
      this.isValid = bool;
    },
    addRoleToStore() {
      this.addRole(this.name, this.description);
    },
  },
  watch: {
    name(newName) {
      if (newName != "") {
        this.setValid(true);
      } else {
        this.setValid(false);
      }
    },
  },
};
</script>
<style lang=""></style>
