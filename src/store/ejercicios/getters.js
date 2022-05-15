export default {
    getEjercicios: ( state ) => {
        return state.ejercicios
    
        //return state.ejercicios.filter( categoria => categoria.text.toLowerCase().includes( term.toLocaleLowerCase() ) )
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

