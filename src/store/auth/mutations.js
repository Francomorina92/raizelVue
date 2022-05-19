
export const setToken = (state, token) => {
    state.token = token
    state.isAutenticado = true
}
export const removeToken = (state, token) => {
    state.token = ''
    state.isAutenticado = false
}
export const setMe = (state, me) => {
    state.me = me
}


