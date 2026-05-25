const Auth = require("../models/auth.model");

const registerUserService = async ({ name, email, password }) => {
  const existingUser = await Auth.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await Auth.create({
    name,
    email,
    password,
  });

  return user;
};

module.exports = {
  registerUserService,
};
