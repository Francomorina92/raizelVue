
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
export const setImg = (state, imagen) => {
    const usuario = state.me;
    usuario.img = imagen;
    state.me = usuario;
}
export const setError = (state, error) => {
    state.error = error
}


