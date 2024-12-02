const express = require('express');
const router = express.Router();
const habitLogController = require('../controllers/habitLogController');

router.get('/', habitLogController.getAllHabitLogs);

router.get('/:id', habitLogController.getHabitLogById);

router.post('/', habitLogController.createHabitLog);

router.put('/:id', habitLogController.updateHabitLog);

router.delete('/:id', habitLogController.deleteHabitLog);

module.exports = router;
