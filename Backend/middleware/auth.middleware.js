import { validateToken } from "../services/auth.service.js";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token || req.header.authorization.split(" ")[1];
    if (!token) {
      return res.send(401).send({ error: "Unauthorized user." });
    }

    const user = validateToken(token);
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized user." });
  }
};
