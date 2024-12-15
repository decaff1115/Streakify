// const Habit = require('../models/Habit'); // Assuming you have a Habit model

// // Create a new Habit for a user
// exports.createHabit = async (req, res) => {
//     try {
//         const { user_id, name, description, goal } = req.body; // Habit fields coming from the request body
//         const habit = await Habit.create({ user_id, name, description, goal });
//         return res.status(201).json(habit); // Respond with the newly created habit
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error creating Habit', error: error.message });
//     }
// };

// // Get Habit information for a specific user and habit
// exports.getHabit = async (req, res) => {
//     try {
//         const { habitId } = req.params; // habitId is passed in the URL parameters
//         const habit = await Habit.findByPk(habitId);

//         if (!habit) {
//             return res.status(404).json({ message: 'Habit not found' });
//         }

//         return res.status(200).json(habit); // Return the habit information as a response
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error retrieving Habit', error: error.message });
//     }
// };

// // Update Habit information (e.g., name, description, goal)
// exports.updateHabit = async (req, res) => {
//     try {
//         const { habitId } = req.params; // habitId is passed in the URL parameters
//         const { name, description, goal } = req.body; // Fields to update, coming from request body

//         const habit = await Habit.findByPk(habitId);
//         if (!habit) {
//             return res.status(404).json({ message: 'Habit not found' });
//         }

//         // Only update the fields that are provided in the request body
//         habit.name = name || habit.name;
//         habit.description = description || habit.description;
//         habit.goal = goal || habit.goal;

//         await habit.save(); // Save the updated habit
//         return res.status(200).json(habit); // Return the updated habit
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error updating Habit', error: error.message });
//     }
// };

// // Delete a Habit (e.g., when a user deletes the habit or it is no longer relevant)
// exports.deleteHabit = async (req, res) => {
//     try {
//         const { habitId } = req.params; // habitId is passed in the URL parameters
//         const habit = await Habit.findByPk(habitId);
//         if (!habit) {
//             return res.status(404).json({ message: 'Habit not found' });
//         }

//         await habit.destroy(); // Delete the habit
//         return res.status(204).json({ message: 'Habit deleted' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error deleting Habit', error: error.message });
//     }
// };
