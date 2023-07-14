import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);

    throw new Error("🚫 Unauthorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);

    req.payload = payload;
  } catch (error) {
    res.status(401);

    if (
      error instanceof jwt.TokenExpiredError &&
      error.name === "TokenExpiredError"
    ) {
      throw new Error(error.name);
    }

    throw new Error("🚫 Unauthorized 🚫");
  }

  return next();
};

export default isAuthenticated;
