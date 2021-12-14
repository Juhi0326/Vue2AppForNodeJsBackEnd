import Vue from "vue";
import VueRouter from "vue-router";
import AuthService from '../services/authService';
import Home from "../views/Home";


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register'),
  },
  {
    path: '/resetPasswordEmail',
    name: 'ResetPasswordEmail',
    component: () =>
      import(/* webpackChunkName: "ResetPasswordEmail" */ '../views/ResetPasswordEmail'),
  },
  {
    path: '/users/addNewPassword/:id/:token',
    name: 'AddNewPassword',
    component: () =>
      import(/* webpackChunkName: "AddNewPassword" */ '../views/AddNewPassword'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () =>
      import(/* webpackChunkName: "Products" */ '../views/Products'),
  },
  {
    path: '/product-details/:id',
    name: "ProductDetails",
    component: () =>
      import(/* webpackChunkName: "ProductDetails" */ '../views/ProductDetails'),
    meta: { authorize: ['user','moderator', 'admin'] }
  },
  {
    path: '/mydata/:id',
    name: "MyData",
    component: () =>
      import(/* webpackChunkName: "MyData" */ '../views/MyData'),
    meta: { authorize: ['user', 'moderator', 'admin'] }
  },
  {
    path: '/admin/add-new-product',
    name: "AddNewProduct",
    component: () =>
      import(/* webpackChunkName: "AddNewProduct" */ '../views/admin/AddNewProduct'),
    meta: { authorize: ['admin'] }
  },
  {
    path: '/admin/user-list',
    name: "UserList",
    component: () =>
      import(/* webpackChunkName: "UserList" */ '../views/admin/UserList'),
    meta: { authorize: ['admin'] }
  },
  {
    path: '/admin/admin-dashboard',
    name: "AdminDashboard",
    component: () =>
      import(/* webpackChunkName: "AdminDashboard" */ '../views/admin/AdminDashboard'),
    meta: { authorize: ['admin'] }
  },
  {
    path: '/unauthorized',
    name: "UnAuthorized",
    component: () =>
      import(/* webpackChunkName: "UnAuthorized" */ '../views/UnAuthorized'),
  },
  {
    path: '/*',
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound'),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page

  const { authorize } = to.meta;
  const currentUser = AuthService.getUser()

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to unauthorized page
      return next({ path: '/unauthorized' });
    }
  }

  next();
})



export default router;