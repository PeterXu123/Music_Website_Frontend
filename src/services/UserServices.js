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


export const login = (user) =>
    fetch(`${serverUrl}/users/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => {
        console.log("dsfdsfdf")
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
