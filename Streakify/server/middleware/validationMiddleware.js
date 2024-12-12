const validateHabitData = (req, res, next) => {
    const { name, target_frequency, target_value, repetition_days, start_date } = req.body;

    if (!name || !target_frequency || !target_value || !repetition_days || !start_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['DAILY', 'WEEKLY'].includes(target_frequency)) {
        return res.status(400).json({ message: 'Invalid target frequency' });
    }

    if (target_value <= 0) {
        return res.status(400).json({ message: 'Target value must be greater than 0' });
    }

    next();
};

module.exports = { validateHabitData };
