const express = require("express");
const app = express();
const tweets = require("./tweets.json");

//add a key to each object in the array
tweets.forEach((tweet, index)=> {
  tweet.tweet_number = index;
})

//handle requests to static files
app.use(express.static("public"));

//handle requests for dynamic data
app.get("/tweets/:count/:username", (request, response) => {


//pull out count. If !count use 1
const {count = 1, username } = request.params;

//convert count to number and check it exists
const countAsNum = Number(count)
if (Number.isNaN(countAsNum) || countAsNum < 1) {
  response.send("Error: invalid number entered");
  return;
}

if (countAsNum>tweets.length) {
response.send("Error: Insufficient data to meet request");
return;
}

//validation passed

let copyTweets = [...tweets];

  //random the array
  copyTweets.sort(()=>{
    return 0.5 - Math.random();
  })

//
if (username) {
  copyTweets = copyTweets.filter((tweet)=>{return tweet.user.screen_name.toLowerCase().includes(username.toLowerCase())})
}

  //chop array to count
  copyTweets.length = countAsNum > copyTweets.length ? copyTweets.length : countAsNum;
  
  //send
  response.send(copyTweets)  
})


const PORT = process.env.PORT || 6001;
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})