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
    resetCategorias : ( state ) => {
        state.isLoading= false,
        state.categorias= [],
        state.respuesta= null,
        state.error= null,
        state.from= 0
    },
    setCategoria : ( state, categoria ) => {
        state.categorias = [ ...state.categorias, categoria ]
        state.isLoading = false
    },
    editCategoria : ( state, categoria ) => {
        const categorias = state.categorias.map(function (x) {
            if (x.id==categoria.id) {
                return categoria                
            }else{
                return x
            }
        });
        state.categorias = [ ...categorias]
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
