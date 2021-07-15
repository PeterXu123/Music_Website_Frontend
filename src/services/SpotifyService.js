const localUrl = 'http://localhost:8887/search'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com/search'
const awsServerUrl = "http://musicbackend-env.eba-smtfbcm3.us-east-2.elasticbeanstalk.com/search"


export const searchArtist = (artistName) => {
        let t = {content: artistName};
        return fetch(`${awsServerUrl}/artist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(t)
        })
            .then(response => response.json())
            .then(response => {
                return response;
            })
            .catch((error) =>  console.log("Error message is ", error))
    };

export const searchArtistById = (id) => {
    let t = {id: id};
    return fetch(`${awsServerUrl}/artist/id`, {
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
    return fetch(`${awsServerUrl}/song`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => {
            //console.log(response)
            return response
        })
        .catch((error) =>  console.log("Error message is ", error))
};

export const searchAlbumsForArtist = (id) => {
    let t = {id: id};
    return fetch(`${awsServerUrl}/artist/albums`, {
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
    return fetch(`${awsServerUrl}/album/songs`, {
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
    return fetch(`${awsServerUrl}/song/id`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(t)
    })
        .then(response => response.json())
        .then(response => response)
        .catch((error) =>  console.log("Error message is ", error))
};

export const searchPopularSongs = () => {
    console.log("hererererer")
    return fetch(`${awsServerUrl}/popular`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response
        })
        .catch((error) =>  console.log("Error message is ", error))
        .catch((error) => {
            console.log("not authenticated user")
        })
};
