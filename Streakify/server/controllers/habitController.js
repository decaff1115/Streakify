// controllers/habitController.js
module.exports = {
    getAllHabits: (req, res) => {
        res.send('Get all habits (not implemented yet)');
    },
    getHabitById: (req, res) => {
        res.send(`Get habit by ID: ${req.params.id} (not implemented yet)`);
    },
    createHabit: (req, res) => {
        res.send('Create a habit (not implemented yet)');
    },
    updateHabit: (req, res) => {
        res.send(`Update habit with ID: ${req.params.id} (not implemented yet)`);
    },
    deleteHabit: (req, res) => {
        res.send(`Delete habit with ID: ${req.params.id} (not implemented yet)`);
    }
};
