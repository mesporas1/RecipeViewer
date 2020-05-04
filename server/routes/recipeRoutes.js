const express = require('express');
const debug = require('debug')('app:recipeRoutes');
const axios = require('axios');
const cheerio = require('cheerio');
// if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const {parseWOL, parseAR} = require('../files/parseRecipe');
const parseLink = require('../files/parseLink')
const recipeRouter = express.Router();
const recipeSites = require('../files/recipeSites')

function router() {
  recipeRouter.route('/getRecipe')
    // Woks of Life Recipe Scraper
    .post(async (request, response) => {
      const { recipeUrl } = request.body;
      const goodLinkName = parseLink(recipeUrl)
      if (goodLinkName){
        try {
          const fetchData = async () => {
            const result = await axios.get(recipeUrl);
            // debug(result)
            return cheerio.load(result.data);
          };
  
          const getResults = async () => {
            const $ = await fetchData();
            switch(goodLinkName){
              case recipeSites[0]:
                return parseWOL($)
              case recipeSites[1]:
                return parseAR($);
              default:
                return response.json({error: 'Could not parse'})
            }
            // return recipe;
          };
  
          const results = await getResults();
        debug(results);
        response.json(results);
        }
        catch(error){
          response.json({error})
        }
      }
      else(
        response.json({error: 'Invalid Link'})
      )
    });
  return recipeRouter;
}

module.exports = router;
