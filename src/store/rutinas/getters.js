export default {
    getRutinas: ( state ) => {
        return state.rutinas
    },
    getRutinasFavoritas: ( state ) => {
        return state.rutinasFavoritas
    },
    getDetalles: ( state ) => {
        return state.detalles
    },
    getPerfil: ( state ) => {
        return state.perfil
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getError:( state ) => {
        return state.error
    },
    getRutina: ( state ) => {
        return state.rutina
    },
}

