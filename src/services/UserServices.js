const localUrl = 'http://localhost:8887'

export const register = (user) =>
    fetch(`${localUrl}/users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())


export const login = (user) =>
    fetch(`${localUrl}/users/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

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
        console.log(response)
        return response.json()
    })
        .
    catch(error => console.log(error))
