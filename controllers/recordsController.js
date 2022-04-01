const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const SolarisRecords = mongoose.model('SolarisRecords');

//Displays A Message
router.get('/', (req, res) => {
    res.render("SolarisDB/addOrEdit", {
        viewTitle: "Insert a Record",   
    });

   
});
//Inserts A Record
router.post('/', (req, res) => {
        if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var solarisrecords = new SolarisRecords();
    solarisrecords.First_Name = req.body.First_Name;
    solarisrecords.Last_Name = req.body.Last_Name;
    solarisrecords.Role = req.body.Role;
    solarisrecords.Email_Address = req.body.Email_Address;
    solarisrecords.Phone_Number = req.body.Phone_Number;
    solarisrecords.Date_Of_Birth = req.body.Date_Of_Birth;
    solarisrecords.Gender = req.body.Gender;
    solarisrecords.Status = req.body.Status;
    solarisrecords.Salary = req.body.Salary;
    solarisrecords.Specialization = req.body.Specialization;
    solarisrecords.Last_Appointment = req.body.Last_Appointment;
    solarisrecords.Primary_Doctor = req.body.Primary_Doctor;
    solarisrecords.Diagnosis = req.body.Diagnosis;
    solarisrecords.Treatment = req.body.Treatment;
    solarisrecords.Prescription = req.body.Prescription;
    solarisrecords.save((err, doc) => {
        if (!err)
            res.redirect('solarisrecords/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("SolarisDB/addOrEdit", {
                    viewTitle: "Insert a Record",
                    solarisrecords: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

//Updates a Record
function updateRecord(req, res) {
    SolarisRecords.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('solarisrecords/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("SolarisDB/addOrEdit", {
                    viewTitle: 'Update Record',
                    solarisrecords: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}



//Retreves All Records Stored
router.get('/list', (req, res) => {
    SolarisRecords.find((err, docs) => {
        if (!err) {
            res.render("SolarisDB/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving record list :' + err);
        }
    });
});

//Function to Implement Error Messages for Fields
function handleValidationError(err, body) {
    for (field in err.errors)
    {
        switch (err.errors[field].path) {
            case 'First_Name':
                body['First_NameError'] = err.errors[field].message;
                break;
            case 'Last_Name':
                body['Last_NameError'] = err.errors[field].message;
                break;
            case 'Email_Address':
                body['Email_AddressError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }

}

//Retreives a Record by Object ID
router.get('/:id', (req, res) => {
    SolarisRecords.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("SolarisDB/addOrEdit", {
                viewTitle: "Update Record",
                solarisrecords: doc
            });
        }
    });
});

//Deletes a Record by their specific Object ID
router.get('/delete/:id', (req, res) => {
    SolarisRecords.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/solarisrecords/list');
        }
        else { console.log('Error in Record delete :' + err); }
    });
});


module.exports = router;