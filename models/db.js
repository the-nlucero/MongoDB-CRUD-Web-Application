const mongoose = require('mongoose');

//Connection to MongoDB database
const uri = "mongodb+srv://Admin_NathanLucero:Twister1997@cluster0.gioxl.mongodb.net/SolarisDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

//Display Message if Successful
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
});


require('./records.model');
