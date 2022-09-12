import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import AddLocation from "../views/AddLocation.vue";
import CreateName from "../views/CreateName.vue";
// import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-location",
    name: "AddLocation",
    component: AddLocation,
  },
  {
    path: "/create-name",
    name: "CreateName",
    component: CreateName,
  },
  // {
  //   path: "/create-name",
  //   name: "CreateName",
  //   component: CreateName,
  // },
  //   {
  //     path: "/about",
  //     name: "About",
  //     component: About,
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
