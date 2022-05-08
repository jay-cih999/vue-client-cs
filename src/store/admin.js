import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/admin';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
  },
  getters: {
    isLogin(state) {
        return state.isLogin;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    loginOk(state, payload) {
      state.isLogin = true;
      state.user = payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      router.push('/admin/login');
    }
  },
  actions: {
    doLogin({state, commit}, payload) {      
      return new Promise((resolve, reject) => {
        axios.post("/login", payload).then(r => {        
          commit('loginOk', r.data);          
          resolve(r.data);
        }).catch(error => {
          reject(error);
        })
      });
    },
      
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
});
