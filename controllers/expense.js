const User = require('../model/user')
const Expense = require('../model/expense')
// Fetch all expense of a particular user
async function getExpenseByUser(userId) {
  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Find all expenses authored by this user
    const expenses = await Expense.find({ user: userId });
    return expenses;
  } catch (error) {
    console.error('Error fetching stories:', error.message);
    throw error;
  }
}

module.exports = {
  getExpenseByUser
}