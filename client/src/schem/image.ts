import { z } from "zod";

export const validateImage = z.object({
  isPublic: z.boolean(),
  id: z.string(),
  isOwner: z.boolean(),
});

export const validateImageFetch = z.array(validateImage);

export type Image = z.infer<typeof validateImage>;
export type Images = z.infer<typeof validateImageFetch>;