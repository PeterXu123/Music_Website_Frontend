const localUrl = 'http://localhost:8887'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com'
const awsServerUrl = "http://musicbackend-env.eba-smtfbcm3.us-east-2.elasticbeanstalk.com"
export const register = (user) =>

    fetch(`${awsServerUrl}/users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())

export const updateUser = (userId, user) => {
    console.log(userId)
    return fetch(`${awsServerUrl}/users/update/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())
}


export const login = (user) =>
    fetch(`${awsServerUrl}/users/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
    .catch(error => console.log(error))

export const logout = () =>
    fetch(`${awsServerUrl}/users/logout`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response)



export const profile = () =>
    fetch(`${awsServerUrl}/users/profile`, {
        method: 'GET',
        credentials: "include"
    }).then(response => {
        let b = response.json()
        // console.log(b)

        return b
    })
    .catch(error => {
        // console.log("line 64")
        // console.log(error);
        return undefined
    })



export const addToFav = (record) =>

    fetch(`${awsServerUrl}/users/addToFav`, {
        method: 'POST',
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

    fetch(`${awsServerUrl}/users/removeFav`, {
        method: 'PUT',
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

    fetch(`${awsServerUrl}/users/addFriend`, {
        method: 'POST',
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

    fetch(`${awsServerUrl}/users/removeFriend`, {
        method: 'PUT',
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
    return fetch(`${awsServerUrl}/users/find/${uid}`, {
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
    return fetch(`${awsServerUrl}/users/myFriends/${uid}`, {
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

    fetch(`${awsServerUrl}/users/findAllUser`, {
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

    fetch(`${awsServerUrl}/users/removeUser/${uid}`, {
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

    return fetch(`${awsServerUrl}/users/getRole/${uid}`, {
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
