const express = require('express');
const debug = require('debug')('app:recipeRoutes');
const axios = require('axios');
const cheerio = require('cheerio');
// if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const recipeRouter = express.Router();

function router() {
  recipeRouter.route('/getRecipe')
    // Woks of Life Recipe Scraper
    .post(async (request, response) => {
      const { recipeUrl } = request.body;
      // debug(recipeUrl);
      try {
        const fetchData = async () => {
          const result = await axios.get(recipeUrl);
          // debug(result)
          return cheerio.load(result.data);
        };

        const getResults = async () => {
          const $ = await fetchData();
          // const recipeSite = $('div').attr('class', 'wprm-recipe-container').html();
          // const recipeParser = /wprm-recipe-container-\d+/
          // const recipeId = recipeParser.exec(recipeSite)
          // const recipe = $('#' + recipeId.toString()).html();
          const ingredients = [];
          $('.wprm-recipe-ingredient', '.wprm-recipe-ingredients').each(function getIngredients(i) {
            ingredients[i] = $(this).text();
          });
          const recipeSteps = [];
          $('.wprm-recipe-instruction', '.wprm-recipe-instructions').each(function getRecipeSteps(i) {
            recipeSteps[i] = $(this).text();
          });
          debug(recipeSteps);
          // debug(result)
          return { ingredients, recipeSteps };
          // return recipe;
        };

        const results = await getResults();
      debug(results);
      response.json(results);
      }
      catch(error){
        response.json({error})
      }
      

      
      
    });
  return recipeRouter;
}

module.exports = router;
