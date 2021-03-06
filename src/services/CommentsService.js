const localUrl = 'http://localhost:8887/comments'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com/comments'
const awsServerUrl = "http://musicbackend-env.eba-smtfbcm3.us-east-2.elasticbeanstalk.com/comments"


export const createComment = (comObj) => {

    return fetch(`${serverUrl}/createComment`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comObj)
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch((error) =>  console.log("Error message is ", error))
};


export const findCommentsForSong = (songId) => {

    return fetch(`${serverUrl}/findAllComments/${songId}`, {
        method: 'Get',
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch((error) =>  console.log("Error message is ", error))
};



export const deleteComment = (comId) => {

    return fetch(`${serverUrl}/deleteComment/${comId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch((error) =>  console.log("Error message is ", error))
};
