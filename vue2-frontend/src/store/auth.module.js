import AuthService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    
    login({ commit }, user) {
 
      return AuthService.login(user).then(
        
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
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
      console.log(state.status.loggedIn)
      console.log(state.user)
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.removeItem(user);
    },
    RegisterFormSuccess(state) {
      state.status.loggedIn = false;
    },
    RegisterFormFailure(state) {
      state.status.loggedIn = false;
    }
  }
};