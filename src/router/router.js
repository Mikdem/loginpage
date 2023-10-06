import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue'
import JobsList from '../components/JobsList.vue'; 
import { fetchJobsData } from '../components/JobsList.vue';
const routes = [
  {
    path: '/',
    component: LoginForm,
    name: 'Login'
  },
  {
    path: '/Jobs',
    component: JobsList,
    name: 'JobsList',
    meta: {
      requiresAuth: true
    },
    beforeRouteEnter(to, from, next) {
      fetchJobsData().then(data => {
        next(vm => {
          vm.data = data;
        });
      }).catch(error => {
        console.error(error);
        next(false);
      });
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
