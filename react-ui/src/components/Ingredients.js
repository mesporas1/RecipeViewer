import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
const axios = require('axios');
axios.defaults.withCredentials = true;

function Ingredients(props) {

    console.log(props.ingredients)
    const ingredientList = props.ingredients.map(function (ingredient) {
        return <li dangerouslySetInnerHTML={{ __html: ingredient }}></li>
    })
    return <ol class="ingredients">
        {ingredientList}
    </ol>

}

export default Ingredients;

