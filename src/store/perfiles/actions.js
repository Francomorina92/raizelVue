import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadPerfil({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/perfiles/${objeto.id}`)
        
            commit('setPerfil', data )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }        
    },
    async loadMeGusta({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post(`/likes/megusta`, objeto)
        
            commit('setMeGusta', data )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }        
    },
    async setMeGusta({ commit },objeto) {
        try {
            debugger;
            commit('setLoading', true )
            const {data} = await api.post(`/likes/megusta`, objeto)
            commit('setMeGusta', data )
        } catch (error) {
            commit('setError', error )
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
    }
}

