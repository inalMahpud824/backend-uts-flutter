const prisma = require("../models");

const getAllProfile = async () => {
  const result = await prisma.profile.findMany();
  return result;
};

// const getMovieById = async (params) => {
//     const id = parseInt(params);
//     const result = await prisma.movies.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     return result
//   };

const deleteProfileById = async (params) => {
  const id = parseInt(params);
  const cekId = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  if (!cekId) {
    return false
  }
  const result = await prisma.profile.delete({
    where: {
      id: id,
    },
    select:{
      name: true,
      image: true
    }
  });
  return result;
};

const createProfile = async (name, provinsi, kabupaten, latitude, longtitude, file) => {
  const result = await prisma.profile.create({
    data: {
      name: name,
      provinsi: provinsi,
      kabupaten: kabupaten,
      latitude: latitude,
      longtitude: longtitude,
      image: file,
    },
    select: {
      name: true,
      provinsi: true,
      kabupaten: true,
      latitude: true,
      longtitude: true,
      image: true,
    },
  });
  return result;
};

const updateProfileById = async (params, name, provinsi, kabupaten, latitude, longtitude, file) => {
  const id = parseInt(params);
  const ltd = parseFloat(latitude)
  const longtd = parseFloat(longtitude)
  const cekId = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  if (!cekId) {
    throw new ResponseError(404, "not found");
  }
  const getOldPhoto = await prisma.profile.findUnique({
      where:{
          id: id
      },
      select:{
        image: true,
        name: true
      }
  })

  const result = await prisma.profile.update({
    data: {
      name: name,
      provinsi: provinsi,
      kabupaten: kabupaten,
      latitude: ltd,
      longtitude: longtd,
      image: file
    },
    where: {
      id: id,
    },
    select: {
      name: true,
      provinsi: true,
      kabupaten: true
    },
  });
  const oldPhoto = getOldPhoto.image
  const data = {result, oldPhoto}
  return data;
};


module.exports = {
  getAllProfile,
  createProfile,
  deleteProfileById,
  updateProfileById
};
