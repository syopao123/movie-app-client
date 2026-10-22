import AddMovie from '@/pages/AddMovie.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Logout from '@/pages/Logout.vue'
import MovieDetail from '@/pages/MovieDetail.vue'
import Register from '@/pages/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/movies/:id',
      name: 'MovieDetail',
      component: MovieDetail
    },
    {
      path: '/movies/addMovie',
      name: 'AddMovie',
      component: AddMovie
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: '/'
    },
  ],
})

export default router
