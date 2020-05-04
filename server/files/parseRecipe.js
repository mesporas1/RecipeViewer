const debug = require('debug')('app:recipeRoutes');

function parseWOL($){
  const ingredients = [];
  $('.wprm-recipe-ingredient', '.wprm-recipe-ingredients').each(function getIngredients(i) {
    ingredients[i] = $(this).text();
    });
  const recipeSteps = [];
  $('.wprm-recipe-instruction', '.wprm-recipe-instructions').each(function getRecipeSteps(i) {
    recipeSteps[i] = $(this).text();
    });        
  return { ingredients, recipeSteps };
}

function parseAR($){
  const ingredients = [];
  $('.ingredients-item-name').each(function getIngredients(i) {
    ingredients[i] = $(this).text();
  });
  if (ingredients.length == 0){
    $('[itemprop="recipeIngredient"]').each(function getIngredients(i) {
      ingredients[i] = $(this).text();
    });
  }
  const recipeSteps = [];
  $('.section-body').find('p').each(function getRecipeSteps(i) {
    recipeSteps[i] = $(this).text();
  });
  if (recipeSteps.length == 0){
    $('[class="recipe-directions__list--item"]').each(function getRecipeSteps(i) {
      recipeSteps[i] = $(this).text();
    });
    if (recipeSteps[-1] == null){
      recipeSteps.pop();
    }
  }
  return { ingredients, recipeSteps };
}

module.exports = {parseWOL, parseAR};