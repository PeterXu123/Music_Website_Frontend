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
        case "SEARCH_SONG": {
            return {
                searchResult: action.songs
            }
        }
    }
    return state
};


export default spotifyReducer
