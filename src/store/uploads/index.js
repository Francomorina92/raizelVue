import state from './state'
import getters from './getters'
import mutations from './mutations'
import uploadsActions from './actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions:uploadsActions,
  state
}
