const { profileControllers } = require('../controllers')
const { uploadMiddleware } = require('../middleware')
const router = require('express').Router()

router.get('/', profileControllers.getAllProfile )
// router.get('/:id', movieControllers.getMovieById)
router.delete('/:id', profileControllers.deleteProfileById)
router.post('/', uploadMiddleware.single('file'), profileControllers.createProfile)
router.put('/:id', uploadMiddleware.single('file'), profileControllers.updateProfileById)

module.exports = router