export default {
    getRutinas: ( state ) => {
        return state.rutinas
    },
    getPerfil: ( state ) => {
        return state.perfil
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getError:( state ) => {
        return state.error
    }
}

