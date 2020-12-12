const localUrl = 'http://localhost:8887'
const serverUrl = 'https://webdev-music-website-server.herokuapp.com'
export const register = (user) =>

    fetch(`${localUrl}/users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())

export const updateUser = (userId, user) => {
    console.log(userId)
    return fetch(`${localUrl}/users/update/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())
}


export const login = (user) =>
    fetch(`${localUrl}/users/login`, {
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
    fetch(`${localUrl}/users/logout`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response)


export const profile = () =>
    fetch(`${localUrl}/users/profile`, {
        method: 'GET',
        credentials: "include"
    }).then(response => {
        let b = response.json()
        console.log(b)

        return b
    })
    .catch(error => console.log(error))



export const addToFav = (record) =>

    fetch(`${localUrl}/users/addToFav`, {
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
    fetch(`${localUrl}/users/removeFav`, {
        method: 'PUT',
        body: JSON.stringify(record),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))


export const addToFriendList = (fobj) =>

    fetch(`${localUrl}/users/addToFriendList`, {
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

    fetch(`${localUrl}/users/removeFromFriendList`, {
        method: 'DELETE',
        body: JSON.stringify(fobj),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))



export const getUser = (uid) =>

    fetch(`${localUrl}/users/find/${uid}`, {
        method: 'Get',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))



export const getAllUser = () =>

    fetch(`${localUrl}/users/findAllUser`, {
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

    fetch(`${localUrl}/users/removeUser/${uid}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))

