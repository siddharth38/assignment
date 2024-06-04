const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    fullName: { type: String },
    relation: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    gender: { type: String },
    currentAddress: {
        type: {
            address: { type: String },
            state: { type: String },
            city: { type: String },
            country: { type: String }
        }
    },
    district: { type: String },
    tehsil: { type: String },
    village: { type: String },
    occupation: { type: String },
    consent: { type: Boolean },
    name: { type: String }
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
