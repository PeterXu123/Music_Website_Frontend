const localUrl = 'http://localhost:8887/search'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com/search'


export const searchArtist = (artistName) => {
        let t = {content: artistName};
        return fetch(`${serverUrl}/artist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(t)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                return response;
            })
            .catch((error) =>  console.log("Error message is ", error))
    };

export const searchArtistById = (id) => {
    let t = {id: id};
    return fetch(`${serverUrl}/artist/id`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
};



export const searchSong = (song) => {
    let t = {content: song};
    return fetch(`${serverUrl}/song`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response
        })
        .catch((error) =>  console.log("Error message is ", error))
};

export const searchAlbumsForArtist = (id) => {
    let t = {id: id};
    return fetch(`${serverUrl}/artist/albums`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
};

export const searchSongsForAlbum = (id) => {
    let t = {id: id};
    return fetch(`${serverUrl}/album/songs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
}


export const searchSongsById = (songId) => {
    let t = {id: songId};
    return fetch(`${serverUrl}/song/id`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
};

