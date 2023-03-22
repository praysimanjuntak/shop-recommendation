// import packages
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

// controllers
const rec = require('./controllers/rec');
// express
const app = express();

// middleware
app.use(helmet());
app.use(bodyParser.json());

const allowedOrigin = ['http://localhost:3000']; // for dev mode
const corsOptions = {
    origin: function (origin, callback) {
        if (true) {
            console.log("allowed", origin)
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'))
            console.log("not allowed", origin)
        }
    },
    
}

app.use(cors(corsOptions));
app.post('/rec', rec.handleRecommendation)

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})