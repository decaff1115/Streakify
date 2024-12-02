// controllers/streakController.js
module.exports = {
    getAllStreaks: (req, res) => {
        res.send('Get all streaks (not implemented yet)');
    },
    getStreakById: (req, res) => {
        res.send(`Get streak by ID: ${req.params.id} (not implemented yet)`);
    },
    createStreak: (req, res) => {
        res.send('Create a streak (not implemented yet)');
    },
    updateStreak: (req, res) => {
        res.send(`Update streak with ID: ${req.params.id} (not implemented yet)`);
    },
    deleteStreak: (req, res) => {
        res.send(`Delete streak with ID: ${req.params.id} (not implemented yet)`);
    }
};
