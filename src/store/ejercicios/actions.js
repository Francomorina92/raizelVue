import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadEjercicios({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/ejercicios`, {params:{limite:objeto.limite, desde:objeto.desde, filtro: objeto.filtro}})
            const rows=data.ejercicios;
            if ( !rows ){
                commit('setLoading', false )
                commit('setRespuesta', false )
                return
            }else if (rows.length < 11) {
                commit('setRespuesta', false )
            }else{
                commit('setRespuesta', true )
                rows.pop();
            }
            commit('setFrom', rows.length)
            const rowsFormateada = rows.map(function(x) {
                x.createdAt = date.formatDate(x.createdAt,'DD-MM-YYYY')
                x.updatedAt = date.formatDate(x.updatedAt,'DD-MM-YYYY')
                return x;
            });
        
            const ejercicios = []
            for( let id of Object.keys( rowsFormateada ) ) {
                ejercicios.push({
                    id,
                    ...rowsFormateada[id]
                })
            }
        
            commit('setEjercicios', ejercicios )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async setEjercicio({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post('/ejercicios',objeto)
            if ( !data ){
                return
            }
            const dataFormateada = {
                createdAt: date.formatDate(data.createdAt,'DD-MM-YYYY'),
                updatedAt: date.formatDate(data.updatedAt,'DD-MM-YYYY'),
                detalles: data.detalles,
                ejecucion: data.ejecucion,
                estado: data.estado,
                id: data.id,
                idCategoria: data.idCategoria,
                idEquipamiento: data.idEquipamiento,
                idMusculoPrincipal: data.idMusculoPrincipal,
                idMusculoSecundario: data.idMusculoSecundario,
                idPerfil: data.idPerfil,
                nombre: data.nombre,
                preparacion: data.preparacion,
            };
            commit('setEjercicio', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async editEjercicio({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.put(`/ejercicios/${objeto.id}`,objeto)
            if ( !data ){
                return
            }
            const dataFormateada = {
                createdAt: date.formatDate(data.createdAt,'DD-MM-YYYY'),
                updatedAt: date.formatDate(data.updatedAt,'DD-MM-YYYY'),
                detalles: data.detalles,
                ejecucion: data.ejecucion,
                estado: data.estado,
                id: data.id,
                idCategoria: data.idCategoria,
                idEquipamiento: data.idEquipamiento,
                idMusculoPrincipal: data.idMusculoPrincipal,
                idMusculoSecundario: data.idMusculoSecundario,
                idPerfil: data.idPerfil,
                nombre: data.nombre,
                preparacion: data.preparacion,
            };
            commit('editEjercicio', dataFormateada )
            return data;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    },
    async resetUsuarios({ commit }) {
        try {
            commit('setLoading', true )
            commit('resetUsuarios')
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    },
    async cambiarImagen({ commit }, objeto) {
        try {
            commit('setLoading', true )
            commit('cambiarImagen', objeto)
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
    }
}

