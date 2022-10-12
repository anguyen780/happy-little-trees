const router = require('express').Router();
const videoRoutes = require('./videoRoutes');

router.use('/video', videoRoutes)

module.exports = router;
