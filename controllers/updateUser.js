const userService = require("../services/user");

// Regular expression to check if a string contains only digits
const isNumeric = /^\d+$/;

// Function to validate an email address
function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Controller function to update user details
exports.updateUser = async (req, res) => {
    try {
        // Extract userId from request parameters
        const userId = req.params.userId;
        const updateData = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ error: "userId is mandatory" });
        }

        // Check if updateData is provided
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No data provided for update" });
        }
        if(updateData.mobileNumber){
            if (!isNumeric.test(updateData.mobileNumber)) {
                return res.status(500).json({ error: "mobile number should only contain digits" });
            } 
            if(updateData.mobileNumber.length!==10){
                return res.status(500).json({ error: "mobile number should be of length 10" });
            }
        }
        if(updateData.email){
            if (!validateEmail(updateData.email)) {
                return res.status(500).json({ error: "email is not valid" });
            }
        }
        if(updateData.userId){
            return res.status(400).json({ error: "userId is not allowed in the body" });
        }
        // Validate and update attributes
        const updatedUser = await userService.updateUser(userId, updateData);

        // Return updated user details
        return res.status(200).json(updatedUser);
    } catch (error) {
        // Handle error
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
