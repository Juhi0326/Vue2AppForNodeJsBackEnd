import AuthService from '../services/authService';
import userService from '../services/userService';


const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    activeUser: state => {
      return state.user
    },
    loginStatus: state => {
      return state.status
    }
  },
  actions: {

    login({ commit, dispatch }, user) {

      return AuthService.login(user).then(

        user => {
          

          commit('loginSuccess', user);
          dispatch('snackBar/showSnackbar', {text: "Sikeresen bejelentkeztél!"}, { root: true } )
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    changeUser({ commit }, id) {
      return userService.getUserById(id).then(
        myUser => {
          commit('changeUserSucces', myUser.data);
          return Promise.resolve(myUser);
        }
      )

    },
    logout({ commit, dispatch}) {
      //AuthService.logout();
      commit('logout');
      dispatch('snackBar/showSnackbar', {text: "Sikeresen kijelentkeztél!"}, { root: true } )
    },
    RegisterForm({ commit }, user) {
      return AuthService.RegisterForm(user).then(
        response => {
          commit('RegisterFormSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('RegisterFormFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    changeUserSucces(state, user) {
      console.log(user)
      state.user = user;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems2');
    },
    RegisterFormSuccess(state) {
      state.status.loggedIn = false;
    },
    RegisterFormFailure(state) {
      state.status.loggedIn = false;
    }
  }
};