const initSpotifyState = {
    searchResult: '',
    condition : 0
};

const spotifyReducer = (state = initSpotifyState, action) => {
    switch (action.type) {
        case "SEARCH_ARTIST": {
            return {
                searchResult: action.artists,
                condition: 0
            }
        }
        case "SEARCH_SONG": {
            return {
                searchResult: action.songs,
                condition: 1

            }
        }
    }
    return state
};


export default spotifyReducer
