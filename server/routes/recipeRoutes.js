const express = require('express');
const debug = require('debug')('app:recipeRoutes');
const axios = require("axios");
const cheerio = require("cheerio");
//if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const recipeRouter = express.Router();

function router(nav) {
  recipeRouter.route('/getRecipe')
  // Woks of Life Recipe Scraper
    .post(async function(request, response) {
            const {recipeUrl} = request.body;
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
              const recipe = $('#' + recipeId.toString()).html();
              const ingredients = [];
              $('.wprm-recipe-ingredient', '.wprm-recipe-ingredients').each(function(i,elem){
                ingredients[i] = $(this).html();
              });
              let recipeSteps = [];
              $('.wprm-recipe-instruction', '.wprm-recipe-instructions').each(function(i,elem){
                recipeSteps[i] = $(this).html();
              })
              debug(recipeSteps)
              //debug(result)
              return {ingredients, recipeSteps};
              //return recipe;
            }
            results = await getResults();
            debug(results)
            response.json(results)
          }
    ) 
  return recipeRouter;
}

module.exports = router;
