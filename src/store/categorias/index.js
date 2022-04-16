import state from './state'
import getters from './getters'
import mutations from './mutations'
import categoriaActions from './actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions:categoriaActions,
  state
}
