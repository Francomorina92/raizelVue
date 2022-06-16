import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadUsuarios({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.get(`/usuarios`, {params:{limite:objeto.limite, desde:objeto.desde, filtro: objeto.filtro}})
            const rows=data.usuarios;
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
                x.rol = x.rol == 'ADMIN_ROLE' ? 'Administrador' : 'Usuario'
                x.createdAt = date.formatDate(x.createdAt,'DD-MM-YYYY')
                x.updatedAt = date.formatDate(x.updatedAt,'DD-MM-YYYY')
                return x;
            });
        
            const usuarios = []
            for( let id of Object.keys( rowsFormateada ) ) {
                usuarios.push({
                    id,
                    ...rowsFormateada[id]
                })
            }
        
            commit('setUsuarios', usuarios )
        } catch (error) {
            commit('setError', error )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async setUsuario({ commit },objeto) {
        try {
            commit('setLoading', true )
            const {data} = await api.post('/usuarios',objeto)
            if ( !data ){
                return
            }
            const dataFormateada = {
                createdAt: date.formatDate(data.usuario.createdAt,'DD-MM-YYYY'),
                updatedAt: date.formatDate(data.usuario.updatedAt,'DD-MM-YYYY'),
                estado: data.usuario.estado,
                id: data.usuario.id,
                rol: data.usuario.rol == 'ADMIN_ROLE' ? 'Administrador' : 'Usuario',
                email: data.usuario.email
            };
            commit('setUsuario', dataFormateada )
            return data.usuario;
        } catch (ex) {
            commit('setError', ex.response.data.errors )
        }finally{
            commit('setLoading', false )
        }
        
    },
    async editUploads({ commit },objeto) {
        try {
            commit('setLoading', true )
            const formData = new FormData();
            formData.append('archivo', objeto.archivo);
            const {data} = await api.put(`/uploads/${objeto.coleccion}/${objeto.id}`,formData)
            if ( !data ){
                return
            }
            commit('editUploads', data.nombreArchivo )
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
    }
}

