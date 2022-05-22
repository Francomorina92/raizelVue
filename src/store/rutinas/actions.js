import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadRutinas({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/rutinas`,{params:{perfil: objeto.idP}})
        
            commit('setRutinas', data )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }        
    },
    async loadPerfil({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/perfiles/${objeto.id}`,)
        
            commit('setPerfil', data )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }        
    },
    async setRutina({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post('/rutinas',objeto)
            if ( !data ){
                return
            }
            commit('setRutina', data )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async editPerfil({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.put(`/perfiles/${objeto.id}`,objeto)
            if ( !data ){
                return
            }            
            commit('editPerfil', data )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    },
    async resetRutinas({ commit }) {
        try {
            commit('setLoading', true )
            commit('resetRutinas')
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    }
}

