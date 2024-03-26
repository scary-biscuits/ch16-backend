const express = require("express");
const app = express();
const tweets = require("./tweets.json");

//handle requests to static files
app.use(express.static("public"));

//handle requests for dynamic data
app.get("/tweet", (request, response) => {

    const randomNum = Math.floor(Math.random()*tweets.length)
  response.send(tweets[randomNum])  
})


const PORT = process.env.PORT || 6001;
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})