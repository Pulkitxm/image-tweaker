import jwt from "jsonwebtoken";
import {
  HASH_PREFIX,
  HASH_SALT,
  HASH_SUFFIX,
  JWT_SECRET,
} from "../constants/env";
import { TokenType } from "../schema/user";

const hashPass = (pass: string): string => {
  const saltedChars = pass
    .split("")
    .map((char) => `${HASH_SALT}${char}${HASH_SALT}`);
  const hashedPass = HASH_PREFIX + saltedChars.join("") + HASH_SUFFIX;
  return hashedPass;
};

const unHashPass = (hashedPass: string): string => {
  const midHashedPass = hashedPass.slice(
    HASH_PREFIX.length,
    -HASH_SUFFIX.length
  );
  const pass = midHashedPass.replace(new RegExp(HASH_SALT, "g"), "");
  return pass;
};

export const getToken = (password: string, username: string) => {
  const hashedPass = hashPass(password);
  return jwt.sign(
    {
      username,
      password: hashedPass,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const decodeToken = (token: string): TokenType => {
  const decodeToken = jwt.verify(token, JWT_SECRET);
  const res = decodeToken as TokenType;
  if (!res.username || !res.password) {
    throw new Error("Invalid Token");
  }
  return { username: res.username, password: res.password };
};

export const checkToken = (userPassword: string, dbPassword: string) => {
  const unHashedPass1 = unHashPass(dbPassword);
  const unHashedPass2 = unHashPass(userPassword);
  return unHashedPass1 === unHashedPass2;
};
