const localUrl = 'http://localhost:8887/musics'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com/musics'
const awsServerUrl = "http://musicbackend-env.eba-smtfbcm3.us-east-2.elasticbeanstalk.com/musics"
export const addMusicOrGet = (musicId, title) => {
    console.log("here")
    return fetch(`${serverUrl}/music/${musicId}`, {
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


