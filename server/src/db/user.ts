import prisma from "../client";

export async function getImagesFromDb(user_id: string) {
  const images = await prisma.image.findMany({
    where: {
      createdById: user_id,
    },
    select: {
      id: true,
      isPublic: true,
    },
  });
  return images;
}

export async function getImageUrlById(
  public_id: string,
  user_id: string
): Promise<string | undefined> {
  const dbImage = await prisma.image.findFirst({
    where: {
      id: public_id,
      createdById: user_id,
    },
    select: {
      cloudinary_url: true,
    },
  });
  return dbImage?.cloudinary_url;
}

export async function addImageToDb(
  cloudinary_url: string,
  user_id: string
): Promise<string> {
  const dbImage = await prisma.image.create({
    data: {
      cloudinary_url,
      createdById: user_id,
    },
  });
  return dbImage.id;
}
