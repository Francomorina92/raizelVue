export default{
    setLikes : ( state, likes ) => {
        state.likes = likes
        state.isLoading = false
    },
    setLoading : ( state, estado ) => {
        state.isLoading = estado
    },
    setError : ( state, error ) => {
        state.error = error
    }
}
