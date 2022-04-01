const mongoose = require('mongoose');
const { ObjectID } = require("bson");

// Calibrating Environment for Inserting
var recordsSchema = new mongoose.Schema(
    {
        First_Name: { type: String, required: 'This field is required.' },
        Last_Name: { type: String, required: 'This field is required.' },
        Role: { type: String },
        Email_Address: { type: String, required: 'This field is required.' },
        Phone_Number: { type: String },
        Date_Of_Birth: { type: Date },
        Gender: { type: String },
        Status: { type: String },
        Salary: { type: Number },
        Specialization: { type: String },
        Last_Appointment: { type: Date },
        Primary_Doctor: { type: String },
        Diagnosis: { type: String },
        Treatment: { type: Array },
        Prescription: { type: Array }
    },

);;


// Custom validation restriction for email
recordsSchema.path('Email_Address').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('SolarisRecords', recordsSchema);