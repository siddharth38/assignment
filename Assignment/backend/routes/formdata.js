const express = require('express');
const router = express.Router();
const FormData = require('../model/formdata');

router.post('/submit', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'An error occurred while saving form data' });
    }
});

module.exports = router;
