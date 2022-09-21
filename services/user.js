const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;

const createUser = async (firstName, lastName, email, password) => {
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(
        password,
        Number.parseInt(process.env.AUTH_ROUNDS)
      ),
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
};
