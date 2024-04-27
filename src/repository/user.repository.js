const prisma = require("../models");

const createUser = async (username, password, nama) => {
  const result = await prisma.user.create({
    data: {
      username: username,
      password: password,
      nama: nama,
    },
    select: {
      username: true,
    },
  });
  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      username: true,
      password: true,
    },
  });
};

const getUserByUsername = async (username) => {
  const result = await prisma.user.findUnique({
    where:{
      username: username
    },
    select:{
      username: true,
      password: true
    }
  })
  return result
};

module.exports = { createUser, getAllUsers, getUserByUsername };
