const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const debug = require("debug")("app");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 5000;

//app.use(express.static(path.resolve(__dirname, "../static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  debug(`Node listening on port ${PORT}`);
});

app.get("*", function(request, response) {
  const recipeUrl = "https://thewoksoflife.com/homemade-chinese-egg-noodles/";
  debug(recipeUrl);
  const $ = axios.get(recipeUrl).then(function(data) {
    debug(data);
    return cheerio.load(data);
  });
  debug('Why')
  response.send($);
});

//create a server object:
/*http
  .createServer(function(req, res) {
    res.write("Hello World!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080*/
