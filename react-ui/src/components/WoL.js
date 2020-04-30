import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import Ingredients from './Ingredients'
import RecipeSteps from './RecipeSteps'
const axios = require('axios');
axios.defaults.withCredentials = true;

function WoL(props) {

    const [ingredients, setIngredients] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeLoaded, setRecipeLoaded] = useState(false);
    const [ingredientHeight, setIngredientHeight] = useState({})
    const [recipeHeight, setRecipeHeight] = useState({})
    const [recipeUrl, setRecipeUrl] = useState('https://thewoksoflife.com/drunken-noodles-pad-kee-mao/');
    const [isFetching, setIsFetching] = useState(false);
    
    /*useEffect(() => {
        const fetchRecipe = async () => {   
            setIsFetching(false)
        }
        fetchRecipe()
    }, [isFetching]);*/

    async function getRecipe() {
        //event.preventDefault();
        
        try {
            setIsFetching(true);
            const response = await axios.post('/recipe/getRecipe', {
                recipeUrl: recipeUrl
            })
            console.log(response)
            const { recipeSteps, ingredients } = response.data;
            setIngredientHeight({height:'30%'})
            setRecipeHeight({height:'70%'})
            setRecipeSteps(<RecipeSteps steps={recipeSteps} />);
            setIngredients(<Ingredients ingredients={ingredients} />);
            setRecipeLoaded(true);
            //setIsFetching(false);
        }
        catch (e) {
            console.log(e);
        }
    }
    return <div className={"container"}>
        {isFetching ? recipeLoaded ? null : <div> Waiting.. </div> : <div className={"header"}>
        <h1>Enter Recipe Url</h1>
            <input type="text"
                value={recipeUrl}
                onChange={event => setRecipeUrl(event.target.value)}
            ></input>
            <button onClick={getRecipe}>View recipe</button>
            </div>
        }
        
        <div className={"ingredient-list"} style={ingredientHeight}>{ingredients}</div>
        <div className={"recipe-step"} style={recipeHeight}>{recipeSteps}</div>
    </div>

}

export default WoL;