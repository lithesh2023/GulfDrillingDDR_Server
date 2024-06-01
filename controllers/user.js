const User = require("../model/user")

// Update user details function
async function updateUserDetails(userId, newDetails) {
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user properties
    for (const key in newDetails) {
      if (Object.hasOwnProperty.call(newDetails, key)) {
        user[key] = newDetails[key];
      }
    }

    // Save the updated user
    const updatedUser = await user.save()
    return updatedUser;
  } catch (error) {
    console.error('Error updating user details:', error.message);
    throw error;
  }
}

module.exports ={updateUserDetails}