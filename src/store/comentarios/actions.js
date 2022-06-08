import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadCalificaciones({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/calificaciones`, {params:{perfil: objeto.perfil}})
        
            commit('setCalificaciones', data.calificaciones )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async setCalificacion({ commit },objeto) {
        try {
            commit('setLoading', true )
            debugger;
            const {data} = await api.post('/calificaciones',objeto)
            if ( !data ){
                return
            }
            commit('setCalificacion', data )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async editCalificacion({ commit },objeto) {
        try {
            commit('setLoading', true )
            debugger;
            const {data} = await api.put(`/calificaciones/${objeto.id}`,objeto)
            if ( !data ){
                return
            }            
            commit('editCalificacion', data )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    },
    async resetCalificaciones({ commit }) {
        try {
            commit('setLoading', true )
            commit('resetCalificaciones')
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    }
}

