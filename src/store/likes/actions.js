import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadTodos({ commit }) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/likes/todos`)
        
            commit('setLikes', data.likes )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }        
    },
    async loadUltimos({ commit }) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/likes/ultimos`)
        
            commit('setLikes', data.likes )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }        
    }
}

