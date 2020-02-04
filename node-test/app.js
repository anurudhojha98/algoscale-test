const express = require('express');
const app = express();
const mongoose = require('mongoose');

var bodyParser = require('body-parser');

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json')

const router = express.Router();
const cors = require('cors');



var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/algoscale', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected successfully!')
});

/* All routes will be added there */

require('./routes/authRoutes')(app,router);
require('./routes/userRoutes')(app,router);


var options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started!")
});