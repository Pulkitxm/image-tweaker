import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1),
  email: z.string().email(),
});

export const UserCreateSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

export type TokenType = {
  username: string;
  password: string;
};
export type UserType= z.infer<typeof UserSchema>;