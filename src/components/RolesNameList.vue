<template>
  <div class="w-4/6 mx-auto shadow p-3 rounded">
    <div class="divide-y">
      <div class="flex justify-between text-sm font-bold mb-3">
        <div>รายการ</div>
        <div>จำนวน {{ getRoles.length }}</div>
      </div>
      <div
        v-if="!getFetchingLocationStatus"
        v-for="(i, index) in getRoles"
        :key="index"
      >
        <div class="p-4 flex justify-between">
          <div>
            <p class="font-bold">{{ i.name }}</p>
            <p class="text-extralight text-gray-800">
              {{ `${i.description} #${index + 1}` }}
            </p>
          </div>
          <button
            class="bg-gray-200 h-10 w-10 rounded-full hover:bg-gray-300"
            @click="removeRoleInStore(index)"
          >
            -
          </button>
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
    const { getRoles } = storeToRefs(locationStore);
    const { removeRole, fetchLocation } = useLocationStore();
    return {
      locationStore,
      getRoles,
      removeRole,
    };
  },
  data() {
    return {};
  },
  methods: {
    removeRoleInStore(index) {
      this.removeRole(index);
    },
  },
};
</script>
<style lang=""></style>
