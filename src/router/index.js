import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from "firebase/app"
import 'firebase/auth'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/home',
    },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
    {
      path: '/workouts',
      name: 'Workouts',
      component: () => import(/* webpackChunkName: "workouts" */ '../views/Workouts.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/add-workout',
      name: 'Add Workout',
      component: () => import(/* webpackChunkName: "add-workout" */ '../views/AddWorkout.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: {
        requiresAnon: true,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
      meta: {
        requiresAnon: true,
      }
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((record) => record.meta.requiresAuth)) {
      next({
        path: "/login",
      });
    } else if (user && to.matched.some((record) => record.meta.requiresAnon)) {
      next({
        path: "/home",
      });
    }
    else {
      next();
    }
  });
});

export default router
