import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
const axios = require('axios');
axios.defaults.withCredentials = true;

function RecipeSteps(props) {

    console.log(props.ingredients)
    const steps = props.steps.map(function (step) {
        return <li dangerouslySetInnerHTML={{ __html: step }}></li>
    })
    return <ol class="ingredients">
        {steps}
    </ol>

}

export default RecipeSteps;

