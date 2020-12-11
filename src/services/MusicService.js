const localUrl = 'http://localhost:8887/music'


export const addMusicToDB = (musicId) => {
    let m = {musicId: musicId};
    console.log(m);
    return fetch(`${localUrl}/addMusic`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(m)
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch((error) =>  console.log("Error message is ", error))
};
