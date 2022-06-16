export default {
    getUrl: ( state ) => {
        return state.url
    },
    getLoading:( state ) => {
        return state.isLoading
    },
    getError:( state ) => {
        return state.error
    }
}

