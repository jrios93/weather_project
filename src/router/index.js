import { createRouter,createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WeatherView from "../views/WeatherView.vue";

const routes =[

  {
    path:"/",
    name:"Home",
    component: HomeView
  },
  {
    path:"/weather",
    name:"Weather",
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
