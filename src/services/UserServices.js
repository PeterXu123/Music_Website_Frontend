const localUrl = 'http://localhost:8887'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com'
export const register = (user) =>

    fetch(`${serverUrl}/users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
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
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response)


export const profile = () =>
    fetch(`${serverUrl}/users/profile`, {
        method: 'GET',
        credentials: "include"
    }).then(response => {
        let b = response.json()
        console.log(b)

        return b
    })
    .catch(error => console.log(error))



export const addToFav = (record) =>

    fetch(`${serverUrl}/users/addToFav`, {
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

    fetch(`${serverUrl}/users/removeFav`, {
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

    fetch(`${serverUrl}/users/addFriend`, {
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

    fetch(`${serverUrl}/users/removeFriend`, {
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
