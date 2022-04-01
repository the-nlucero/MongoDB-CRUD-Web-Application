require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const recordsController = require('./controllers/recordsController');

var app = express();

//Server or Port Number Specified
var PORT = process.env.PORT || 5000;
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs', defaultLayout: 'mainLayout', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true}, layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


app.listen(PORT, () => {
    console.log('Express server started at port : 5000');
});



app.use('/solarisrecords', recordsController);
