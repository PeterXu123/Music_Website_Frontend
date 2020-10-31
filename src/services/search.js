export class searchService {

    constructor() {

    }

    searchSong = (searchContent) => {
        console.log(searchContent)
        let t = {content: searchContent}
       return  fetch('http://localhost:8887/search/artist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(t)
        }) .then(response => {
            console.log(123)
           let t = response.json()
           console.log(t)
           return t;
       })
            .then(response => {
                console.log(response)
                return response;
            })
            .catch((error) =>  console.log("Error message is ", error))

    }






}

