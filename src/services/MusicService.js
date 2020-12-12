const localUrl = 'http://localhost:8887/musics'


export const addMusicOrGet = (musicId, title) => {
    console.log("here")
    return fetch(`${localUrl}/music/${musicId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title})
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch((error) =>  console.log("Error message is ", error))
};
