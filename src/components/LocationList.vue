<template>
  <div class="w-4/6 mx-auto shadow p-3 rounded">
    <div class="divide-y">
      <div class="flex justify-between text-sm font-bold mb-3">
        <div>สถานที่ที่มีในระบบ</div>
        <div>จำนวน {{ getLocationList.length }}</div>
      </div>
      <div
        v-if="!getFetchingLocationStatus"
        v-for="(i, index) in getLocationList"
        :key="index"
      >
        <div class="p-4 flex justify-between">
          <div>
            <p class="font-bold">{{ i.name }}</p>
            <p class="text-extralight text-gray-800">
              {{ `สร้างโดย ${i.createBy}` }}
            </p>
          </div>
        </div>
      </div>
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
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang=""></style>
