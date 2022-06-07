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
    setRutinasFavoritas : ( state, rutinas ) => {
        const rowsFormateada = rutinas.map(function(x) {
            if (state.rutinasFavoritas.filter(c => c.id !== x.id? false : true)){
                return x;
            }
        });
        state.rutinasFavoritas = [ ...state.rutinasFavoritas, ...rowsFormateada ]
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
    },
    setDetalle : ( state, detalle ) => {
        state.detalles = [ ...state.detalles, detalle ]
        state.isLoading = false
    },
    resetDetalles : ( state ) => {
        state.isLoading= false,
        state.detalles= [],
        state.error= null
    },
    setRutina : ( state, rutina ) => {
        state.rutina = rutina
        state.isLoading = false
    },
    editDetalle : ( state, detalle ) => {
        const detalles = state.detalles.map(function (x) {
            if (x.id==detalle.id) {
                return detalle                
            }else{
                return x
            }
        });
        state.detalles = [ ...detalles]
        state.isLoading = false
    },
}
