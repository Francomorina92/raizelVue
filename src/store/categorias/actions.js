import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadCategorias({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/categorias/${objeto.limite}/${objeto.desde}`)
            const {rows}=data.categorias;
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
        
            const categorias = []
            for( let id of Object.keys( rowsFormateada ) ) {
                categorias.push({
                    id,
                    ...rowsFormateada[id]
                })
            }
        
            commit('setCategorias', categorias )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async setCategoria({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post('/categorias',objeto)
            if ( !data ){
                return
            }
            const dataFormateada = {
                createdAt: date.formatDate(data.createdAt,'DD-MM-YYYY'),
                updatedAt: date.formatDate(data.updatedAt,'DD-MM-YYYY'),
                estado: data.estado ? 'Activa' : 'Desactivada',
                id: data.id,
                nombre: data.nombre
            };
            commit('setCategoria', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
        
    }
}

