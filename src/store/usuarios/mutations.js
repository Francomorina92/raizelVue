export default{
    setUsuarios : ( state, usuarios ) => {
        const rowsFormateada = usuarios.map(function(x) {
            if (state.usuarios.filter(u => u.id !== x.id? false : true)){
                return x;
            }
        });
        state.usuarios = [ ...state.usuarios, ...rowsFormateada ]
        state.isLoading = false
    },
    resetUsuarios : ( state ) => {
        state.isLoading= false,
        state.usuarios= [],
        state.respuesta= null,
        state.error= null,
        state.from= 0
    },
    setUsuario : ( state, usuario ) => {
        state.usuarios = [ ...state.usuarios, usuario ]
        state.isLoading = false
    },
    editUsuario : ( state, usuario ) => {
        const usuarios = state.usuarios.map(function (x) {
            if (x.id==usuario.id) {
                return usuario                
            }else{
                return x
            }
        });
        state.usuarios = [ ...usuarios]
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
