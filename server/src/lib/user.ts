import { Request, Response } from "express";
import { decodeToken } from "./pass";
import prisma from "../client";

export async function checkToken(req: Request, resp: Response) {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }
  try {
    const { username } = decodeToken(token);
    const userExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return userExists ? userExists.id : null;
  } catch (error) {
    return resp.status(401).send({
      message: "Unauthorized Access, Please login to continue",
      status: "failed",
    });
  }
}
