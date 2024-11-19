// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import DashboardMFG from './views/DashboardMFG.vue';
import DashboardHR from './views/DashboardHR.vue';

const routes = [
  { path: '/mfg', component: DashboardMFG },
  { path: '/hr', component: DashboardHR },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
