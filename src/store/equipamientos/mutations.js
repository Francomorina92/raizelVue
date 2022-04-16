export default{
    setEquipamientos : ( state, equipamientos ) => {
        const rowsFormateada = equipamientos.map(function(x) {
            if (state.equipamientos.filter(c => c.id !== x.id? false : true)){
                return x;
            }
        });
        state.equipamientos = [ ...state.equipamientos, ...rowsFormateada ]
        state.isLoading = false
    },
    setEquipamiento : ( state, equipamiento ) => {
        state.equipamientos = [ ...state.equipamientos, equipamiento ]
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
