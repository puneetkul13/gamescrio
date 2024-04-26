const userService = require("../services/user");

// Controller function to delete a user
exports.deleteUser = async (req, res) => {
    try {
        // Extract userId from request parameters
        const userId = req.params.userId;

        // Call userService to delete the user
        let res1 = await userService.deleteUser(userId);

        // Return success message
        return res.status(200).json(res1);
    } catch (error) {
        // Handle error
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};