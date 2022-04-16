export default{
    setEquipamientos : ( state, equipamientos ) => {
        state.equipamientos = [ ...state.equipamientos, ...equipamientos ]
        state.isLoading = false
    }
}
