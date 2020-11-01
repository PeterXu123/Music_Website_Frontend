export const searchArtist = (artistName) => {
        let t = {content: artistName};
        return fetch('http://localhost:8887/search/artist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(t)
        })
            .then(response => response.json())
            .then(response => response)
            .catch((error) =>  console.log("Error message is ", error))
    };

export const searchArtistById = (id) => {
    let t = {id: id};
    return fetch('http://localhost:8887/search/artist/id', {
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
    return fetch('http://localhost:8887/search/song', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
};

export const searchSongsForArtist = (id) => {
    let t = {id: id};
    return fetch('http://localhost:8887/search/artist/songs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
};

