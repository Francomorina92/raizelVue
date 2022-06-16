export default{
    setPerfil : ( state, perfil ) => {
        state.perfil = perfil
        state.isLoading = false
    },
    setPerfilPropio : ( state, perfil ) => {
        state.perfilPropio = perfil
        state.isLoading = false
    },
    setMeGusta : ( state, like ) => {
        state.like = like
        state.isLoading = false
    },
    editPerfil : ( state, perfil ) => {
        state.perfilPropio = perfil
        state.isLoading = false
    },
    setLoading : ( state, estado ) => {
        state.isLoading = estado
    },
    setError : ( state, error ) => {
        state.error = error
    }
}
