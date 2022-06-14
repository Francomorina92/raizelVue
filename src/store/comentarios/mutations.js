export default{
    setCalificaciones : ( state, calificaciones ) => {
        
        state.calificaciones = [ ...calificaciones]
        state.isLoading = false
    },
    resetCalificaciones : ( state ) => {
        state.isLoading= false,
        state.calificaciones= [],
        state.error= null
    },
    setCalificacion : ( state, calificacion ) => {
        state.calificaciones = [ ...state.calificaciones, calificacion ]
        state.isLoading = false
    },
    editCalificacion : ( state, calificacion ) => {
        const calificaciones = state.calificaciones.map(function (x) {
            if (x.id==calificacion.id) {
                return calificacion                
            }else{
                return x
            }
        });
        state.calificaciones = [ ...calificaciones]
        state.isLoading = false
    },
    setRespuesta : ( state, respuesta ) => {
        state.respuesta = respuesta
    },
    setLoading : ( state, estado ) => {
        state.isLoading = estado
    },
    setError : ( state, error ) => {
        state.error = error
    },
    setFrom : ( state, from ) => {
        state.from += from
    }
}
