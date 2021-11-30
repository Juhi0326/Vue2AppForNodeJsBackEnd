import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from '../views/Login'
import Products from '../views/Products'

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/products",
      name: "Products",
      component: Products,
    },
  ];
  
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });



export default router;