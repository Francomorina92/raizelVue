export default{
    setPerfil : ( state, perfil ) => {
        state.perfil = perfil
        state.isLoading = false
    },
    editPerfil : ( state, perfil ) => {
        state.perfil = perfil
        state.isLoading = false
    },
    setLoading : ( state, estado ) => {
        state.isLoading = estado
    },
    setError : ( state, error ) => {
        state.error = error
    }
}