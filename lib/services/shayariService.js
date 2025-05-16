// service layer to handle backend service and also responsible to communicate with database

import prisma from "../db";
import { ProperCase } from "../utils";

// service to save shayaries into database
export async function saveShayariService(content) {
  if (content.length == 0) throw new Error("Content is empty");

  const result = await prisma.shayari.createMany({
    data: content.map(({ title, content, category }) => ({
      title,
      content,
      category,
    })),
  });

  return result;
}

// service to fetch all the shayari from the database
export async function getALLShayariService({ userId = 0 }) {
  const result = await prisma.shayari.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
      bookmarkedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
    },
  });


  const updatedResult = result.map((shayari) => ({
    ...shayari,
    isLiked: shayari.likedByUsers.length > 0,
    isBookmarked: shayari.bookmarkedByUsers.length > 0,
  }));

  return updatedResult;
}

// service to get shayari by id
export async function getShayariByIdService({ id }) {
  return await prisma.shayari.findUnique({
    where: {
      id,
    },
  });
}

// service to get top shayries
export async function getTopShayariService({ userId = 0 }) {
  const result = await prisma.shayari.findMany({
    orderBy: {
      likes: "desc",
    },
    take: 30,
    include: {
      likedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
      bookmarkedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
    },
  });

  const updatedResult = result.map(shayari => ({
    ...shayari,
    isLiked: shayari.likedByUsers.length > 0,
    isBookmarked: shayari.bookmarkedByUsers.length > 0,
  }))

  return updatedResult;
}

// service to delete 7 days older shayari
export async function automaticDeleteShayariService(date) {
  return await prisma.shayari.deleteMany({
    where: {
      createdAt: {
        lt: date,
      },
    },
  });
}

// service to delete shayari by id
export async function deleteShayariService(id) {
  return await prisma.shayari.delete({
    where: {
      id,
    },
  });
}

// service to update shayari
export async function updateShayariService({
  id,
  title,
  content,
  category,
  likes,
}) {
  return await prisma.shayari.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      category,
      likes,
    },
  });
}

// service to get shayari by category
export async function getShayariByCategoryService({ category , userId }) {
  const shayaries = await prisma.shayari.findMany({
    where: {
      category: ProperCase(category),
    },
    orderBy: {
      id: "desc",
    },
    include: {
      likedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
      bookmarkedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
    }
  });

  const updatedResult = shayaries.map(shayari => ({
    ...shayari,
    isLiked: shayari.likedByUsers.length > 0,
    isBookmarked: shayari.bookmarkedByUsers.length > 0,
  }))


  return updatedResult;

}

// service to like shayari
export async function likeShayariService({ userId, shayariId }) {
  if (!userId || !shayariId) {
    throw new Error("All fields are required");
  }

  const shayari = await prisma.shayari.findUnique({
    where: { id: shayariId },
    include: { likedByUsers: true },
  });

  if (!shayari) {
    throw new Error("Shayari not found");
  }

  const isAlreadyLiked = shayari.likedByUsers.some(
    (user) => user.id === userId
  );

  const transaction = [];

  if (isAlreadyLiked) {
    transaction.push(
      prisma.shayari.update({
        where: { id: shayariId },
        data: {
          likes: { decrement: 1 },
          likedByUsers: {
            disconnect: { id: userId },
          },
        },
      })
    );
  } else {
    transaction.push(
      prisma.shayari.update({
        where: {
          id: shayariId,
        },
        data: {
          likes: { increment: 1 },
          likedByUsers: {
            connect: { id: userId },
          },
        },
      })
    );
  }

  await prisma.$transaction(transaction);

  return isAlreadyLiked;
}


// service to bookmark shayari
export async function bookmarkShayariService({ userId, shayariId }) {
  if (!userId || !shayariId) {
    throw new Error("All fields are required");
  }

  const shayari = await prisma.shayari.findUnique({
    where: { id: shayariId },
    include: { bookmarkedByUsers: true },
  });

  if( !shayari ){
    throw new Error("Shayari not found");
  }

  const isAlreadyBookmarked = shayari.bookmarkedByUsers.some(user=> user.id === userId);

  const transaction = [];

  if( isAlreadyBookmarked ){
    transaction.push(
      prisma.shayari.update({
        where: { id: shayariId },
        data: {
          bookmarkedByUsers: {
            disconnect: {id: userId}
          },
        },
      })
    );
  } else {
    transaction.push(
      prisma.shayari.update({
        where: { id: shayariId },
        data: {
          bookmarkedByUsers: {
            connect: { id: userId },
          },
        },
      })
    );
  }

  await prisma.$transaction(transaction);

  return isAlreadyBookmarked;
}



// service to get bookmarked shayaries
export async function getBookmarkedShayariesService({ userId }) {

  if( !userId ){
    throw new Error("User id is required");
  }

  const result = await prisma.shayari.findMany({
    where: {
      bookmarkedByUsers: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      likedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
      bookmarkedByUsers: {
        where: { id: userId },
        select: { id: true },
      },
    },
    orderBy: {
      id: 'desc'
    }
  });

  const updatedResult = result.map(shayari => ({
    ...shayari,
    isLiked: shayari.likedByUsers.length > 0,
    isBookmarked: shayari.bookmarkedByUsers.length > 0,
  }))

  return updatedResult;
}
