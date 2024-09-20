import { NextFunction, Request, Response } from "express";
import prisma from "./client";
import { decodeToken } from "./lib/pass";

export async function checkToken(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  
  if (!token) {
    return resp.status(401).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
  }
  try {
    const { username } = decodeToken(token);
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!userExists) {
      return resp.status(401).send({
        message: "Unauthorized Access, Please login to continue",
        status: "failed",
      });
    }
    resp.locals.user = userExists;
    next();
  } catch (error) {
    return resp.status(401).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
  }
}
