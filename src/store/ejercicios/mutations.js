export default{
    setEjercicios : ( state, ejercicios ) => {
        const rowsFormateada = ejercicios.map(function(x) {
            if (state.ejercicios.filter(u => u.id !== x.id? false : true)){
                return x;
            }
        });
        state.ejercicios = [ ...state.ejercicios, ...rowsFormateada ]
        state.isLoading = false
    },
    resetEjercicios : ( state ) => {
        state.isLoading= false,
        state.ejercicios= [],
        state.respuesta= null,
        state.error= null,
        state.from= 0
    },
    setEjercicio : ( state, ejercicio ) => {
        state.ejercicios = [ ...state.ejercicios, ejercicio ]
        state.isLoading = false
    },
    editEjercicio : ( state, ejercicio ) => {
        const ejercicios = state.ejercicios.map(function (x) {
            if (x.id==ejercicio.id) {
                return ejercicio                
            }else{
                return x
            }
        });
        state.ejercicios = [ ...ejercicios]
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
