import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
const axios = require('axios');
axios.defaults.withCredentials = true;

function Ingredients(props) {

    console.log(props.ingredients)
    const ingredientList = props.ingredients.map(function (ingredient) {
    return <div><input type="checkbox"></input><label>{ingredient}</label></div>
    })
    return <div>
        <h2>Ingredients</h2>
        
        <div>{ingredientList}</div>
    
    </div>

}

export default Ingredients;

