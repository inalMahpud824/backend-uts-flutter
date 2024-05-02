const router = require('express').Router()
const authRoutes = require('./auth.route')
const profileRoutes = require('./profile.route')
router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)

module.exports = router