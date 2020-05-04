import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import bar from '../images/bar.png'
import Ingredients from './Ingredients'
import RecipeSteps from './RecipeSteps'
const axios = require('axios');
const recipeSites = require('../recipeSites.js')
axios.defaults.withCredentials = true;

function WoL(props) {

    const [ingredients, setIngredients] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeLoaded, setRecipeLoaded] = useState(false);
    const [ingredientHeight, setIngredientHeight] = useState({ height: '25%' })
    const [recipeHeight, setRecipeHeight] = useState({ height: '75%' })
    const [sliderHeight, setSliderHeight] = useState({ bottom: '25%' })
    const [sliderGrabbed, setSliderGrabbed] = useState(false);
    const [recipeUrl, setRecipeUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

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
            setError(null)
            const response = await axios.post('/recipe/getRecipe', {
                recipeUrl: recipeUrl
            })
            console.log(response)
            if (response.data.error){
                setIsFetching(false);
                setError("Error: " + response.data.error)
                alert("Error: " + response.data.error + ". Returning to page.")
            }
            else {
                const { recipeSteps, ingredients } = response.data;
                setRecipeSteps(<RecipeSteps steps={recipeSteps} />);
                setIngredients(<Ingredients ingredients={ingredients} />);
                setRecipeLoaded(true);
            }
            //setIsFetching(false);
        }
        catch (e) {
            console.log(e);
        }
    }

    function grabSlider(event) {
        // event.preventDefault();
        setSliderGrabbed(true);
    }

    function moveSlider(event) {
        //event.preventDefault();
        let newRecipeStepsHeight;
        let draggable
        const screenSize = window.screen.height;

        if (sliderGrabbed == true) {
            newRecipeStepsHeight = screenSize - event.changedTouches[0].pageY;
            draggable = newRecipeStepsHeight - 20;
            if (draggable > 0) {
                setSliderHeight({ bottom: draggable })
                setIngredientHeight({ height: draggable })
                setRecipeHeight({ height: screenSize - newRecipeStepsHeight })
            }

        }
    }

    function releaseSlider(event) {
        //event.preventDefault();
        setSliderGrabbed(false);
    }

    function newRecipe(event) {
        setRecipeLoaded(false);
        setRecipeUrl('');
        setIsFetching(false);
    }
    return <div className={"container"}>
        {isFetching ? recipeLoaded ? null : <div> Waiting.. </div> : <div className={"header"}>
            <h1>Enter Recipe Url</h1>
            <input type="text"
                value={recipeUrl}
                onChange={event => setRecipeUrl(event.target.value)}
                placeholder='e.g. https://thewoksoflife.com/***'
            ></input>
            <button onClick={getRecipe}>View recipe</button>
            <h2>Supported Sites</h2>
            <ol>{recipeSites.map(function(site, index){
                return <li key={index}>{site}</li>
            })}</ol>
        </div>
        }
        { error ? <div>{error}</div> : null}
        {recipeLoaded ?
            <div>
                <div className={"recipe-step"} style={recipeHeight}>
                    <button class={"new-recipe"} onClick={newRecipe}>New Recipe?</button>
                    {recipeSteps}
                </div>
                <div class={"slider"} onTouchStart={grabSlider} onTouchEnd={releaseSlider} onTouchMove={moveSlider} style={sliderHeight}><img src={bar} alt="Slider Bar" /></div>
                <div className={"ingredient-list"} style={ingredientHeight}>{ingredients}</div>
            </div>
            : null}
    </div>

}

export default WoL;