const localUrl = 'http://localhost:8887'

export const register = (user) =>
    fetch(`${localUrl}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"

    }).then(response => response.json())


export const login = (user) =>
    fetch(`${localUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())


export const profile = () =>
    fetch(`${localUrl}/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())
