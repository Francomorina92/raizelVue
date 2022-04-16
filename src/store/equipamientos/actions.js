import {api} from '../../boot/axios'
import { date } from 'quasar'

export default {
    async loadEquipamientos({ commit }) {
        const {data} = await api.get('/equipamientos')
        const {rows}=data.equipamientos;
        if ( !rows ){
            commit('setEquipamientos', [] )
            return
        }
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
    }
}

