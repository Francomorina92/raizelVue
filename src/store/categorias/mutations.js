export default{
    setCategorias : ( state, categorias ) => {
        const rowsFormateada = categorias.map(function(x) {
            if (state.categorias.filter(c => c.id !== x.id? false : true)){
                return x;
            }
        });
        state.categorias = [ ...state.categorias, ...rowsFormateada ]
        state.isLoading = false
    },
    setCategoria : ( state, categoria ) => {
        state.categorias = [ ...state.categorias, categoria ]
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
