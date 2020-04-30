import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
const axios = require('axios');
axios.defaults.withCredentials = true;

function RecipeSteps(props) {

    console.log(props.ingredients)
    const steps = props.steps.map(function (step) {
    return <li>{step}</li>
    })
    return <div>
        <h2>Recipe Steps</h2>
        <ol>
        {steps}
        </ol>
        </div>

}

export default RecipeSteps;

