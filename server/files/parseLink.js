const debug = require('debug')('app:recipeRoutes');
const recipeSites = require('./recipeSites')

function parseLink(link){
    const re = /(\w+)(?=.com)/gm;
    const OK = re.exec(link);
    debug(OK);

    if (!OK){
        return false;
    }
    else if (recipeSites.includes(OK[0])){
        return OK[0];
    }
    else {
        return false;
    }
}

module.exports = parseLink;