import jwt from "jsonwebtoken";

/**
 * This function is used to verify a JWT token
 * @param {*} token The JWT token to verify
 * @returns The decoded payload if the token is valid, otherwise null
 */
export const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, secret);
    return { payload: decoded };
  } catch (error) {
    return null;
  }
};
