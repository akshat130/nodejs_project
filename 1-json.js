const fs = require('fs')
const book = {
    
    title: 'ego is the enemy',
    author: 'ryan holiday cant come'

}
const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json',bookJSON)


const fetch = require('node-fetch');

let url = "https://www.reddit.com/r/popular.json";

let settings = { method: "Get" };

fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        // do something with JSON
    });