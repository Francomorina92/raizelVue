import state from './state'
import getters from './getters'
import mutations from './mutations'
import musculosActions from './actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions:musculosActions,
  state
}
