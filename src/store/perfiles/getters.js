export default {
    getPerfil: ( state ) => {
        return state.perfil
    },
    getPerfilPropio: ( state ) => {
        return state.perfilPropio
    },
    getMegusta: ( state ) => {
        return state.like
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getError:( state ) => {
        return state.error
    }
}

