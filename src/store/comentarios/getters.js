export default {
    getCalificaciones: ( state ) => {
        return state.calificaciones
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getError:( state ) => {
        return state.error
    }
}

