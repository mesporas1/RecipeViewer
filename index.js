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

app.get("*", async function(request, response) {
  const recipeUrl = "https://thewoksoflife.com/vegetable-yakisoba//";
  //debug(recipeUrl);
  const fetchData = async () => {
    const result = await axios.get(recipeUrl);
    //debug(result)
    return cheerio.load(result.data);
  }
 
  const getResults = async () => {
    const $ = await fetchData();
    const recipeSite = $('div').attr('class', 'wprm-recipe-container').html();
    const recipeParser = /wprm-recipe-container-\d+/
    const recipeId = recipeParser.exec(recipeSite)

    const recipe = $('div', '#' + recipeId.toString()).html();
    debug(recipe);

    //debug(result)
    return recipe;

  }
  results = await getResults();
  //debug(results)
  response.send(results);
});

//create a server object:
/*http
  .createServer(function(req, res) {
    res.write("Hello World!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080*/
