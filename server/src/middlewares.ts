import { NextFunction, Request, Response } from "express";
import prisma from "./client";
import { decodeToken } from "./lib/pass";

export async function checkToken(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return resp.status(401).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
  }
  try {
    const { username } = decodeToken(token);
    const userExists = await prisma.user.count({
      where: { username },
    });
    if (userExists === 0) {
      return resp.status(401).send({
        message: "Unauthorized Access, Please login to continue",
        status: "failed",
      });
    }
    next();
  } catch (error) {
    return resp.status(401).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
  }
}
