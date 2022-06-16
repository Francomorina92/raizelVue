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
    resetUploads : ( state ) => {
        state.isLoading= false,
        state.url= '',
        state.error= null
    },
    setUsuario : ( state, usuario ) => {
        state.usuarios = [ ...state.usuarios, usuario ]
        state.isLoading = false
    },
    editUploads : ( state, url ) => {
        state.url = url
        state.isLoading = false
    },
    setLoading : ( state, estado ) => {
        state.isLoading = estado
    },
    setError : ( state, error ) => {
        state.error = error
    }
}
