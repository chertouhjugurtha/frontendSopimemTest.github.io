import { createStore } from 'vuex'

export default createStore({
  state: {
    keycloak: null,
    endpoints: {
      api: " ", // is set automatically in main.js
      login: " ", // is set automatically in main.js
      cns: " " // is set automatically in main.js
    },
    user: {
      isAuthenticated: false,
      name: "",
      id:"",
      idToken: "",
      accessToken: "",
      localeLang:""
    }
  },
  getters: {
  },
  mutations: {
    setKeyCloak(state,payload){
      state.keycloak = payload
    },
    setAPI(state, payload) {
      state.endpoints.api = payload.api;      
    },
    setAPIAndLogin(state, payload) {
      state.endpoints.api = payload.api;
      state.endpoints.login = payload.login;
      state.endpoints.cns = payload.cns
    },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.idToken = "";
      state.user.accessToken = "";
      state.user.localeLang= ""
    },
    login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.idToken =payload.idToken;
      state.user.accessToken =payload.accessToken;
      
    },
    setName(state, payload) {
      state.user.name = payload.name;
      state.user.id = payload.id;
    },
    setLocaleLang(state,payload){
      state.user.localeLang= payload.localeLang;
    }
  },
  actions: {   
  
  },
  modules: {
  }
})
