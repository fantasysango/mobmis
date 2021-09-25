import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoading: false
  },
  mutations: {
    setState(state, obj) {
      Object.assign(state, obj)
    },
    setLoading(state, v) {
      state.isLoading = v
    }
  },
  actions: {},
  modules: {}
});
