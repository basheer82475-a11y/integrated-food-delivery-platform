import generateToken from "./generateToken.js";

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export default sendTokenResponse;

