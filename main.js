var express = require('express');
var app     = express();


//For avoidong Heroku $PORT error
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});