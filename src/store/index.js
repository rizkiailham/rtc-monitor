import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
// axios.defaults.baseURL = 'https://api.streamcontrol.io/api';
export const store = new Vuex.Store({
  state: {
    videoConfig: null,
    backgroundConfig : localStorage.getItem("backgroundConfig") || 1,
    layoutConfig: localStorage.getItem("layoutConfig") || 1
  },
  mutations: {
    setVideoConfig (state, videoConfig) {
      state.videoConfig = videoConfig
    },
    setBackgroundConfig (state, backgroundConfig) {
      // state.backgroundConfig = backgroundConfig
      localStorage.setItem("backgroundConfig", backgroundConfig);
    },
    setLayoutConfig (state, layoutConfig) {
      // state.layoutConfig = layoutConfig
      localStorage.setItem("layoutConfig", layoutConfig);
    },
  },
  actions: {

  },
  modules: {

  }
})
