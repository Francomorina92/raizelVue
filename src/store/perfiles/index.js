import state from './state'
import getters from './getters'
import mutations from './mutations'
import usuarioActions from './actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions:usuarioActions,
  state
}
