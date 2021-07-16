const localUrl = 'http://localhost:8887'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com'
const awsServerUrl = "http://musicbackend-env.eba-smtfbcm3.us-east-2.elasticbeanstalk.com"
export const register = (user) =>

    fetch(`${serverUrl}/users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())

export const updateUser = (userId, user) => {
    console.log(userId)
    return fetch(`${serverUrl}/users/update/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())
}


export const login = (user) =>
    fetch(`${serverUrl}/users/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
    .catch(error => console.log(error))

export const logout = () =>
    fetch(`${serverUrl}/users/logout`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response)



export const profile = () =>
    fetch(`${serverUrl}/users/profile`, {
        method: 'GET',
        mode: 'no-cors',
        credentials: "include"
    }).then(response => {
        let b = response.json()
        console.log(b)

        return b
    })
    .catch(error => {
        // console.log("line 64")
        // console.log(error);
        return undefined
    })



export const addToFav = (record) =>

    fetch(`${serverUrl}/users/addToFav`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(record),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))




export const removeFav = (record) =>

    fetch(`${serverUrl}/users/removeFav`, {
        method: 'PUT',
        mode: 'no-cors',
        body: JSON.stringify(record),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        console.log(record)
        return response.json()
    })
        .catch(error => console.log(error))


export const addToFriendList = (fobj) =>

    fetch(`${serverUrl}/users/addFriend`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(fobj),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))


export const removeFromFriendList = (fobj) =>

    fetch(`${serverUrl}/users/removeFriend`, {
        method: 'PUT',
        mode: 'no-cors',
        body: JSON.stringify(fobj),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))



export const getUser = (uid) => {

    console.log(uid)
    return fetch(`${serverUrl}/users/find/${uid}`, {
        method: 'Get',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))
}

export const getFriendsById = (uid) => {

    console.log(uid)
    return fetch(`${serverUrl}/users/myFriends/${uid}`, {
        method: 'Get',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))
}



export const getAllUser = () =>

    fetch(`${serverUrl}/users/findAllUser`, {
        method: 'Get',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))


export const removeUser = (uid) =>

    fetch(`${serverUrl}/users/removeUser/${uid}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))


export const getRole = (uid) => {

    return fetch(`${serverUrl}/users/getRole/${uid}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))

}
