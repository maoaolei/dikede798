import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null,
    name: '133',
    msg: '',
    hrsassTime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_MSG(state, msg) {
      state.msg = msg
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_HRSASS_TIME(state, hrsassTime) {
      state.hrsassTime = hrsassTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const { data } = await login(loginData)
      // this.$router.push('/dashboard')
      console.log(data)
      commit('SET_TOKEN', data.token)
      commit('SET_HRSASS_TIME', +new Date())
      commit('SET_MSG', data.msg)
    }
  }
}
