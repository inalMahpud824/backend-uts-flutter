const {profileService} = require('../services')

async function getAllProfile(req, res) {
    try{
        const result = await profileService.getAllProfile()
        res.status(200).json(result)
    }catch(err){
        console.error(err)
        res.status(err.status).json(err.message)
    }
}

// async function getMovieById(req, res) {
//     const {id} = req.params
//     try{
//         const result = await movieServices.getMovieById(id)
//         res.status(200).json(result)
//     }catch(err){
//         console.error(err)
//         res.status(err.status).json(err.message)
//     }
// }

async function deleteProfileById(req, res) {
    try{
        const {id} = req.params
        const result = await profileService.deleteProfileById(id)
        res.status(200).json({messege: "delete success ",result})
    }catch(err){
        console.error(err)
        res.status(err.status).json(err.message)
    }
}
async function createProfile(req, res) {
    const {name, provinsi, kabupaten, latitude, longtitude} = req.body
    const {filename: file} = req.file
    try{
        const result = await profileService.createProfile(name, provinsi, kabupaten, latitude, longtitude, file)
        res.status(200).json({messege: "create new data success ",result})
    }catch(err){
        console.error(err)
        res.status(500).json({message: "internal Server Error"})
    }
}

async function updateProfileById(req, res) {
    try{
        const {id} = req.params
        const {name, provinsi, kabupaten, latitude, longtitude} = req.body
        const {filename: file} = req.file
        const result = await profileService.updateProfileById(id, name, provinsi, kabupaten, latitude, longtitude, file)
        res.status(200).json({messege: "update success ",result})
    }catch(err) {
        console.error(err)
        res.status(err.status).json(err.message)
    }
}
module.exports = {getAllProfile, createProfile, deleteProfileById, updateProfileById}