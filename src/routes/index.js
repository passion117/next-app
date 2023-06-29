const express = require('express');
const userRoute = require('./user.route');
const paymentRoute = require('./payment.route');

const router = express.Router();
router.use('/user', userRoute);
router.use('/payment', paymentRoute);


module.exports = router;
