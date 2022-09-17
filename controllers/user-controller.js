const { createUser } = require('../services/user');

module.exports = {
  post: async (req, res) => {
    try {
      const user = await createUser(req.body);
      const response = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
