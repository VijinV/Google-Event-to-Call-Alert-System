import jwt from "jsonwebtoken";

export const jwtSign = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
