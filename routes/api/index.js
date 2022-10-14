const router = require('express').Router();
const userRoutes = require('./userRoutes');
//const testUserRoutes = require('./testUserRoutes') // for testing -alex

router.use('/user', userRoutes);
// router.use('/users', testUserRoutes) // for testing -alex
module.exports = router;