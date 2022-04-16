export default{
    setMusculos : ( state, musculos ) => {
        const rowsFormateada = musculos.map(function(x) {
            if (state.musculos.filter(c => c.id !== x.id? false : true)){
                return x;
            }
        });
        state.musculos = [ ...state.musculos, ...rowsFormateada ]
        state.isLoading = false
    },
    setMusculo : ( state, musculo ) => {
        state.musculos = [ ...state.musculos, musculo ]
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
