import prisma from "../client";

export async function getImagesFromDb(user_id: string, includAllUser: boolean) {
  const allImages: any[] = [];

  const images = await prisma.image.findMany({
    where: {
      createdById: user_id,
    },
    select: {
      id: true,
      isPublic: true,
      createdById: true,
    },
  });
  allImages.push(...images);

  if (includAllUser) {
    const allUsersImages = await prisma.image.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        isPublic: true,
        createdById: true,
      },
    });
    allImages.push(
      ...allUsersImages.filter(
        (image) => allImages.find((i) => i.id === image.id) === undefined
      )
    );
  }
  const allUniqueImages = Array.from(new Set(allImages));
  return allUniqueImages;
}

export async function getNumOfImages(user_id: string) {
  const numOfImages = await prisma.image.count({
    where: {
      createdById: user_id,
    },
  });
  return numOfImages;
}

export async function getAnyImageKeyById(public_id: string): Promise<{
  imageKey: string | undefined;
  isPublic: boolean | undefined;
  createdById: string | undefined;
  id: string;
}> {
  const dbImage = await prisma.image.findFirst({
    where: {
      id: public_id,
    },
    select: {
      id: true,
      imageKey: true,
      isPublic: true,
      createdById: true,
    },
  });
  if (!dbImage) {
    return {
      id: public_id,
      imageKey: undefined,
      isPublic: undefined,
      createdById: undefined,
    };
  }
  return {
    id: dbImage.id,
    imageKey: dbImage.imageKey,
    isPublic: dbImage.isPublic,
    createdById: dbImage.createdById,
  };
}

export async function getImageKeyById(
  public_id: string,
  user_id: string
): Promise<string | undefined> {
  const dbImage = await prisma.image.findFirst({
    where: {
      id: public_id,
      createdById: user_id,
    },
    select: {
      imageKey: true,
    },
  });
  return dbImage?.imageKey;
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
  imageKey: string,
  user_id: string
): Promise<{
  id: string;
  isPublic: boolean;
}> {
  const dbImage = await prisma.image.create({
    data: {
      imageKey,
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
