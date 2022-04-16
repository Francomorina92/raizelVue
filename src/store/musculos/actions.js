import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadMusculos({ commit }) {
        const {data} = await api.get('/musculos')
        const {rows}=data.musculos;
        if ( !rows ){
            commit('setMusculos', [] )
            return
        }
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
    }
}

