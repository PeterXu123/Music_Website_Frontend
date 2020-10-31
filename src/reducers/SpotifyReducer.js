const initSpotifyState = {
    searchResult: ''
};

const spotifyReducer = (state = initSpotifyState, action) => {
    switch (action.type) {
        case "SEARCH_ARTIST": {
            return {
                searchResult: action.artists
            }
        }
    }
    return state
}


export default spotifyReducer
