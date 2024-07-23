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

export async function getNumOfImages(user_id: string) {
  const numOfImages = await prisma.image.count({
    where: {
      createdById: user_id,
    },
  });
  return numOfImages;
}

export async function getAnyImageUrlById(public_id: string): Promise<{
  imageUrl: string | undefined;
  isPublic: boolean | undefined;
  createdById: string | undefined;
}> {
  const dbImage = await prisma.image.findFirst({
    where: {
      id: public_id,
    },
    select: {
      cloudinary_url: true,
      isPublic: true,
      createdById: true,
    },
  });
  return {
    imageUrl: dbImage?.cloudinary_url,
    isPublic: dbImage?.isPublic,
    createdById: dbImage?.createdById,
  };
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

export async function getImagePrivacyById(
  public_id: string,
  user_id: string
): Promise<boolean | undefined> {
  const dbImage = await prisma.image.findFirst({
    where: {
      id: public_id,
      createdById: user_id,
    },
    select: {
      isPublic: true,
    },
  });
  return dbImage?.isPublic;
}

export async function addImageToDb(
  cloudinary_url: string,
  user_id: string
): Promise<{
  id: string;
  isPublic: boolean;
}> {
  const dbImage = await prisma.image.create({
    data: {
      cloudinary_url,
      createdById: user_id,
    },
  });
  return {
    id: dbImage.id,
    isPublic: dbImage.isPublic,
  };
}

export async function deleteImageFromDb(
  imageId: string,
  user_id: string
): Promise<string> {
  const deletedImage = await prisma.image.delete({
    where: {
      id: imageId,
      createdById: user_id,
    },
  });
  return deletedImage.id;
}

export async function updateImagePrivacyToDb(
  imageId: string,
  isPublic: boolean,
  user_id: string
): Promise<string> {
  const updatedImage = await prisma.image.update({
    where: {
      id: imageId,
      createdById: user_id,
    },
    data: {
      isPublic,
    },
  });
  return updatedImage.id;
}
