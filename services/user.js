const userModel = require("../models/user");

exports.createUser = async (name, mobileNumber, email, userId) => {
    try {
        let user = await userModel.find({ userId })
        if (user.length === 0) { 
            await userModel.create({ name, mobileNumber, email, userId});
            return {message: `User is created with the userID - ${userId}`}
        }
        else {
            return {message: "User id is already taken, please try with different one"}
        }
    }
    catch (error) {
        console.log(error)
        throw new Error(error)
    }
};

exports.getUser = async (query) => {
    try {
        let user = await userModel.find(query)
        return user;
    }
    catch (error) {
        console.log(error)
        throw new Error(error)
    }
};

exports.updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { userId: userId },
            { $set: updateData },
            { new: true, useFindAndModify: false }
        );

        if (!updatedUser) {
            return {message: `user with ${userId} is not found`}
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

exports.deleteUser = async(userId) =>{
    try {
        let user = await userModel.find({ userId })
        console.log(user)
        if (user.length === 0) { 
            return {message: `User with the userID - ${userId} not found`}
        }
        await userModel.findOneAndDelete({ userId: userId });
        return {message: "User is deleted"}
    } catch (error) {
        console.error('Error deleting user:', error);
        return {message: `user with ${userId} is not found`}
    }
}