
export function chuckNorrisJoke() {
    let joke = await fetch('http://api.icndb.com/jokes/random')
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                console.log(result.value.joke)
                return result.value.joke 
            }
        ).catch((err) => { console.log(err.message) })
    return joke
}