import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadEquipamientos({ commit }, objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/equipamientos`,{params:{limite:objeto.limite, desde:objeto.desde}})
            const {rows} = data.equipamientos;
            if ( !rows ){
                commit('setLoading', false )
                commit('setRespuesta', false )
                return
            }else if (rows.length < 10) {
                commit('setRespuesta', false )
            }else{
                commit('setRespuesta', true )
            }
            commit('setFrom', rows.length)
            const rowsFormateada = rows.map(function(x) {
                x.createdAt = date.formatDate(x.createdAt,'DD-MM-YYYY')
                x.updatedAt = date.formatDate(x.updatedAt,'DD-MM-YYYY')
                return x;
            });
        
            const equipamientos = []
            for( let id of Object.keys( rowsFormateada ) ) {
                equipamientos.push({
                    id,
                    ...rowsFormateada[id]
                })
            }
        
            commit('setEquipamientos', equipamientos )
        } catch (error) {
            commit('setError', error )
        } finally{
            commit('setLoading', false )
        }
    },
    async setEquipamiento({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post('/equipamientos',objeto)
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
            commit('setEquipamiento', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async editEquipamiento({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.put(`/equipamientos/${objeto.id}`,objeto)
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
            commit('editEquipamiento', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    }
}

