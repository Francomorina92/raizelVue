import state from './state'
import getters from './getters'
import mutations from './mutations'
import ejercicioActions from './actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions:ejercicioActions,
  state
}
