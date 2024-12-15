const express = require('express');
const router = express.Router();
const habitLogController = require('../controllers/habitLogController'); // Make sure this import is correct

// Ensure these methods exist in the habitLogController
// Route to update checked days
router.patch('/update-checked-days', habitLogController.updateCheckedDays);

// Route to get checked days
router.get('/get-checked-days', habitLogController.getCheckedDays);

module.exports = router;