import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: false,
    adminUser: false,
    temp: 0.0,
    humidity: 0.0,
    pressure: 0.0,
    description: '',
    rain: 0.0
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) => (state.authenticated = auth),
    SET_ADMIN_USER: (state: { adminUser: boolean }, adminUser: boolean) => (state.adminUser = adminUser)
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) => commit('SET_AUTH', auth),
    setAdminUser: ({ commit }: { commit: Commit }, adminUser: boolean) => commit('SET_ADMIN_USER', adminUser)
  },
  modules: {
  }
})
