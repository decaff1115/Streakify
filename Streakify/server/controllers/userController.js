// const {User} = require('../models');

// exports.getAllusers = async (req, res) => {
//     try{
//         const users = await User.findAll();
//         res.json(users);
//     } catch (error){
//         res.status(500).json({message: 'Error retrieving users', error});
//     }
// };

// exports.getUserById = async (req, res) => {
//     const{ id } = req.params;
//     try{
//         const users = await User.findByPk(id);
//         if(!user){
//             return res.status(404).json({message: 'User not found'});

//         }
//         res.json(user);

//     }catch(error){
//         res.status(500).json({message: 'Error retrieving user', error});
//     }
// };

// exports.createUser = async (req, res) => {
//     const { username, email, password_hash } = req.body;
//     try {
//         const user = await User.create({ username, email, password_hash });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// };


// exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { username, email, password_hash } = req.body;
//     try {
//         const user = await User.findByPk(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.update({ username, email, password_hash });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user', error });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findByPk(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.destroy();
//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user', error });
//     }
// };

// controllers/userController.js
module.exports = {
    getAllUsers: (req, res) => {
        res.send('Get all users (not implemented yet)');
    },
    getUserById: (req, res) => {
        res.send(`Get user by ID: ${req.params.id} (not implemented yet)`);
    },
    createUser: (req, res) => {
        res.send('Create a user (not implemented yet)');
    },
    updateUser: (req, res) => {
        res.send(`Update user with ID: ${req.params.id} (not implemented yet)`);
    },
    deleteUser: (req, res) => {
        res.send(`Delete user with ID: ${req.params.id} (not implemented yet)`);
    }
};
