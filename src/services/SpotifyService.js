
export const searchArtist = (artistName) => {
        let t = {content: artistName};
        return fetch('http://localhost:8887/search/artist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(t)
        })
            .then(response => response.json())
            .then(response => response)
            .catch((error) =>  console.log("Error message is ", error))
    }


