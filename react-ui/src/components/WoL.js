import React, {useState, useEffect, useCallback} from 'react';
import '../App.css';
const axios = require('axios');

function WoL(props){
    
    const [ingredients, setIngredients] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);
  
    useEffect(() => {
      const fetchCategories = async () => {
            const result = await axios.get('/recipe/getWOLRecipe')
            setCategories(result.data.categories.map((function(category){
            return <tr key = {category._id}>
                <th>{category.name}</th>
            </tr>
            })))
            setIsFetching(false)
      }
      fetchCategories()
    }, [isFetching]);

    function getRecipe(recipeUrl){
        try {
            const get_recipe = async () => {
                await axios.post('/category/add',{
                    categoryName: category
                    })
                setIsFetching(true);
            }
            get_recipe()
            console.log("did the category get added")
        }    catch (e) {
            console.log(e);
    }
    }
    return <div>
    <h1>Woks of Life</h1>
    <form onSubmit={() => {
            getRecipe(recipeUrl)
        }}>
            <input type="text"
                value={recipeUrl}
                onChange={event => setNewCategory(event.target.value)}
            ></input>
            <button type="submit">Add Category</button>
        </form>

    </div>
    
}

export default Categories;