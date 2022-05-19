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
    }else{
        commit('setToken', token)
        commit('setMe', JSON.parse(usuario))
        api.defaults.headers.common.accessToken = token
    }
}
export const singOut = async ({commit}) => {
    api.defaults.headers.common.accessToken = ''
    localStorage.setItem('accessToken', '');
    commit('removeToken')
}
export const getMe = async ({commit, dispatch}, token) => {
    
}

