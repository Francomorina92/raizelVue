export default{
    setRutinas : ( state, rutinas ) => {
        const rowsFormateada = rutinas.map(function(x) {
            if (state.rutinas.filter(c => c.id !== x.id? false : true)){
                return x;
            }
        });
        state.rutinas = [ ...state.rutinas, ...rowsFormateada ]
        state.isLoading = false
    },
    resetRutinas : ( state ) => {
        state.isLoading= false,
        state.rutinas= [],
        state.error= null
    },
    setRutina : ( state, rutina ) => {
        state.rutinas = [ ...state.rutinas, rutina ]
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