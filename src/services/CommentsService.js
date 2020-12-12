const localUrl = 'http://localhost:8887/comments'



export const createComment = (comObj) => {

    return fetch(`${localUrl}/createComment`, {
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

    return fetch(`${localUrl}/findAllComments/${songId}`, {
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

    return fetch(`${localUrl}/deleteComment/${comId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch((error) =>  console.log("Error message is ", error))
};
