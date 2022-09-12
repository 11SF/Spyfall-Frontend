<template>
  <div class="">
    <header
      class="bg-[#2A0944] text-white w-full h-20 shadow-sm flex justify-between items-center px-10"
    >
      <button class="" @click="backtoHomePage">ย้อนกลับ</button>
      <button
        class="bg-[#FFA500] h-12 w-20 rounded-xl shadow"
        @click="submitRoles"
      >
        บันทึก
      </button>
    </header>
    <div class="container mx-auto pt-10">
      <section class="mb-5">
        <h1 class="text-3xl text-center font-bold">เพิ่มสถานที่</h1>
        <p class="text-center">Create By {{ getPlayerInfo.name }}</p>
        <FormLocationName class="mt-10 mb-5" />
      </section>
      <section class="mb-5" v-if="!getNewLocation">
        <LocationList />
      </section>

      <section v-if="getNewLocation">
        <FormRoleName class="mb-5" />
        <RolesNameList class="mb-5" />
      </section>
    </div>
  </div>
</template>
<script>
import FormLocationName from "../components/FormLocationName.vue";
import FormRoleName from "../components/FormRoleName.vue";
import RolesNameList from "../components/RolesNameList.vue";
import LocationList from "../components/LocationList.vue";
import { useLocationStore } from "../stores/locationStore";
import { usePlayerStore } from "../stores/playerStore";
import { storeToRefs } from "pinia";

export default {
  components: { FormLocationName, FormRoleName, RolesNameList, LocationList },
  setup() {
    const locationStore = useLocationStore();
    const { getCreateLocationStatus, getNewLocation } =
      storeToRefs(locationStore);
    const { fetchLocation, rollbackLocation, clearNewLocation, saveRoles } =
      useLocationStore();

    const playerStore = usePlayerStore();
    const { getPlayerInfo } = storeToRefs(playerStore);
    const { fetchPlayerInfo } = usePlayerStore();

    fetchLocation();

    return {
      locationStore,
      getCreateLocationStatus,
      getNewLocation,
      rollbackLocation,
      clearNewLocation,
      getPlayerInfo,
      fetchPlayerInfo,
      fetchLocation,
      saveRoles,
    };
  },
  methods: {
    async backtoHomePage() {
      if (
        this.getNewLocation &&
        confirm("ต้องการออกจากหน้านี้ใช่มั้ยย ข้อมูลทั้งหมดจะไม่ถูกเซฟนะ")
      ) {
        this.rollBackData();
        if (window.history.length > 1) {
          this.$router.back();
        }
        this.$router.push("/");
      }
      if (!this.getNewLocation) {
        if (window.history.length > 1) {
          this.$router.back();
        }
        this.$router.push("/");
      }
    },
    async rollBackData() {
      if (this.getNewLocation) {
        let result = await this.rollbackLocation();
        if (result.code === 1000) {
          this.clearNewLocation();
        }
      }
    },
    async submitRoles() {
      let err = await this.saveRoles();
    },
  },
  async beforeCreate() {
    let isFoundUser = await this.fetchPlayerInfo();
    if (!isFoundUser) {
      return this.$router.push("/create-name");
    }
    let haveDraftLocation = await this.fetchLocation(
      null,
      this.getPlayerInfo.id
    );
  },
  created() {
    document.addEventListener("beforeunload", this.rollBackData());
    // let result = await this.fetchPlayerInfo();
    // console.log(result);
    // if (!result) {
    //   return this.$router.push("/create-name");
    // }
  },
};
</script>
<style lang="css"></style>

<!-- bg-[#1F4690] -->
