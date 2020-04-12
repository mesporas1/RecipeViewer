import React, {useState, useEffect, useCallback} from 'react';
import '../App.css';
const axios = require('axios');
axios.defaults.withCredentials = true;

function WoL(props){
    
    const [ingredients, setIngredients] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('https://thewoksoflife.com/homemade-chinese-egg-noodles/');
    const [isFetching, setIsFetching] = useState(false);
  
    useEffect(() => {
      const fetchRecipe = async () => {
            setIsFetching(false)
      }
      fetchRecipe()
    }, [isFetching]);

    function getRecipe(event){
        event.preventDefault();

        try {
            axios.post('/recipe/getRecipe',{
                recipeUrl: recipeUrl
                }).then(function(response){
                        console.log(response)
                        setRecipeSteps(response.data.recipeSteps)
                        setIngredients(response.data.ingredients)
                    }
                    
                    )
                    console.log("what's going on")
               // setIsFetching(true);
            }
           catch (e) {
            console.log(e);
    }
    }
    return <div>
    <h1>Woks of Life</h1>
    <form onSubmit={getRecipe}>
            <input type="text"
                value={recipeUrl}
                onChange={event => setRecipeUrl(event.target.value)}
            ></input>
            <button type="submit">View recipe</button>
        </form>
    <h2>Ingredients</h2>
    <div>{ingredients}</div>
    <h2>Recipe Steps</h2>
    <div>{recipeSteps}</div>
    </div>
    
}

export default WoL;