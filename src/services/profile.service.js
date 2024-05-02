const path = require("path");
const { profileRepository } = require("../repository");
const ResponseError = require("../utils/response-error.js");
const fs = require('fs');

const getAllProfile = async () => {
  const result = await profileRepository.getAllProfile();
  if (!result) {
    throw err = new ResponseError(500, "Server Error");
  }
  return result;
};
// const getMovieById = async (id) => {
//     const result = await movieRepositories.getMovieById(id)
//     if (!result) {
//       throw err =  new ResponseError(404, "not found");
//     }
//     return result;
//   };

  const deleteProfileById = async (id) => {
    const result = await profileRepository.deleteProfileById(id)
    const filePath = path.join(__dirname, '../../uploads', result.image);

    fs.unlink(filePath, (err) => {
      if (err) {
        throw err =  new ResponseError(500, "internal server error");
      }
    });
    if(!result){
        throw err =  new ResponseError(404, "not found");
    }
    return result;
  };

  const createProfile = async ( name, provinsi, kabupaten, latd, lotd, file ) => {
    const latitude = parseFloat(latd)
    const longtitude = parseFloat(lotd)
    const result = await profileRepository.createProfile( name, provinsi, kabupaten, latitude, longtitude, file)
    return result;
  };

  const updateProfileById = async (params, name, provinsi, kabupaten, latitude, longtitude, file) => {
    const result = await profileRepository.updateProfileById(params, name, provinsi, kabupaten, latitude, longtitude, file)
    const filePath = path.join(__dirname, '../../uploads', result.oldPhoto);
    fs.unlink(filePath, (err) => {
        if (err) {
          throw err =  new ResponseError(500, "internal server error");
        }
      });
    return result
  }
module.exports ={getAllProfile, createProfile, deleteProfileById, updateProfileById}


