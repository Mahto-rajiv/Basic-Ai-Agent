import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
  const userPayload = {
    _id: user._id,
    email: user._id,
  };
  return jwt.sign(userPayload, process.env.JWT_SECRET);
};
