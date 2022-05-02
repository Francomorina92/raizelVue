import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadMusculos({ commit }, objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/musculos`,{params:{limite:objeto.limite, desde:objeto.desde, filtro: objeto.filtro}})
            const rows=data.musculos;
            if ( !rows ){
                commit('setLoading', false )
                commit('setRespuesta', false )
                return
            }else if (rows.length < 11) {
                commit('setRespuesta', false )
            }else{
                rows.pop();
                commit('setRespuesta', true )
            }
            commit('setFrom', rows.length)
            const rowsFormateada = rows.map(function(x) {
                x.createdAt = date.formatDate(x.createdAt,'DD-MM-YYYY')
                x.updatedAt = date.formatDate(x.updatedAt,'DD-MM-YYYY')
                return x;
            });
            const musculos = []
            for( let id of Object.keys( rowsFormateada ) ) {
                musculos.push({
                    id,
                    ...rowsFormateada[id]
                })
            }
        
            commit('setMusculos', musculos )
        }  catch (error) {
            commit('setError', error )
        } finally{
            commit('setLoading', false )
        }
    },
    async setMusculo({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post('/musculos',objeto)
            if ( !data ){
                return
            }
            const dataFormateada = {
                createdAt: date.formatDate(data.createdAt,'DD-MM-YYYY'),
                updatedAt: date.formatDate(data.updatedAt,'DD-MM-YYYY'),
                estado: data.estado,
                id: data.id,
                nombre: data.nombre
            };
            commit('setMusculo', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }        
    },
    async editMusculo({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.put(`/musculos/${objeto.id}`,objeto)
            if ( !data ){
                return
            }
            const dataFormateada = {
                createdAt: date.formatDate(data.createdAt,'DD-MM-YYYY'),
                updatedAt: date.formatDate(data.updatedAt,'DD-MM-YYYY'),
                estado: data.estado,
                id: data.id,
                nombre: data.nombre
            };
            commit('editMusculo', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    },
    async resetMusculos({ commit }) {
        try {
            commit('setLoading', true )
            commit('resetMusculos')
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    }
}

