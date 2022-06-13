export default {
    getLikes: ( state ) => {
        return state.likes
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getError:( state ) => {
        return state.error
    }
}

