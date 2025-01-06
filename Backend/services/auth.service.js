import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
  const userPayload = {
    _id: user._id,
    email: user._id,
  };
  return jwt.sign(userPayload, process.env.JWT_SECRET);
};

export const validateToken = (token) => {
  if (!token) {
    return null;
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
