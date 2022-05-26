import {api} from '../../boot/axios'
export const login = async ({commit}, payload) => {
    const {data} = await api.post('/auth/login',payload)
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    commit('setToken', data.token)
    commit('setMe', data.usuario)
    api.defaults.headers.common.accessToken = data.token
}
export const comprobar = async ({commit, dispatch}) => {
    
    const token = localStorage.getItem('accessToken');
    const usuario = localStorage.getItem('usuario');
    if (!token) {
        api.defaults.headers.common.accessToken = ''
        commit('removeToken')
        localStorage.setItem('accessToken', '');
        localStorage.setItem('usuario', JSON.stringify({}));
        commit('setMe', {})
    }else{
        commit('setToken', token)
        commit('setMe', JSON.parse(usuario))
        api.defaults.headers.common.accessToken = token
    }
}
export const confirmar = async ({commit}, objeto) => {
    try {
        commit('setError', null )
        await api.post('/auth/confirmacionEmail',objeto)
    } catch (ex) {
        commit('setError', ex.response.data )
    }
}
export const cambiarPassword = async ({commit}, objeto) => {
    try {
        commit('setError', null )
        await api.post('/auth/cambiarPassword',objeto)
    } catch (ex) {
        commit('setError', ex.response.data )
    }
}
export const recuperar = async ({commit}, objeto) => {
    try {
        commit('setError', null )
        await api.post('/auth/recuperar',objeto)
    } catch (ex) {
        commit('setError', ex.response.data )
    }
}
export const singOut = async ({commit}) => {
    api.defaults.headers.common.accessToken = ''
    localStorage.setItem('accessToken', '');
    localStorage.setItem('usuario', JSON.stringify({}));
    commit('removeToken')
}
export const getMe = async ({commit, dispatch}, token) => {
    
}
export const init = async ({commit, dispatch}) => {
    const token = localStorage.getItem('accessToken');
    const usuario = localStorage.getItem('usuario');
    if (!token) {
        commit('removeToken')
        api.defaults.headers.common.accessToken = ''
        localStorage.setItem('accessToken', '');
        localStorage.setItem('usuario', JSON.stringify({}));
        commit('setMe', {})
    }else{
        api.defaults.headers.common.accessToken = token
        commit('setToken', token)
        commit('setMe', JSON.parse(usuario))
    }
}

