import Auth from "../models/auth.model.js";

/*
|--------------------------------------------------------------------------
| Register Service
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Login Service
|--------------------------------------------------------------------------
*/

const loginUserService = async ({ email, password }) => {
  const user = await Auth.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  return user;
};

export { registerUserService, loginUserService };

