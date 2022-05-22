import state from './state'
import getters from './getters'
import mutations from './mutations'
import rutinasActions from './actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions:rutinasActions,
  state
}
