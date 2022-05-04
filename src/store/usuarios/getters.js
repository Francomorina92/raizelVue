export default {
    getUsuarios: ( state ) => {
        return state.usuarios
    
        //return state.usuarios.filter( categoria => categoria.text.toLowerCase().includes( term.toLocaleLowerCase() ) )
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getRespuesta:( state ) => {
        return state.respuesta
    },
    getError:( state ) => {
        return state.error
    },
    getFrom:( state ) => {
        return state.from
    }
}

