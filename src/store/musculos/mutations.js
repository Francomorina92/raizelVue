export default{
    setMusculos : ( state, musculos ) => {
        state.musculos = [ ...state.musculos, ...musculos ]
        state.isLoading = false
    }
}
