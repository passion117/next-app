const httpStatus = require('http-status');
const firefose = require('firefose')
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const admin = require('firebase-admin');

const createPayment = async (paymentBody, token) => {
    // var idToken;
    // if (token && token.startsWith('Bearer ')) {
    //     idToken = token.split(' ')[1]
    // }
    // const userInfo = await admin.auth().verifyIdToken(idToken);
    const { email, phoneNumber, creditNumber, year, month } = paymentBody
    // if (userInfo.phone_number != phoneNumber) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Please enter right phone number');
    // }
    if (email && (await isEmailTaken(email))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (phoneNumber && (await isPhoneTaken(phoneNumber))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
    }
    if (creditNumber && (await isCreditTaken(creditNumber))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Credit number already taken');
    }
    const payment = await Payment.create({ email, phoneNumber, creditNumber, year, month });
    if (!payment) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Payment Creation Error');
    }
    const stripe = await createStripe({ email, phoneNumber, creditNumber, year, month });
    if (stripe) {
        return payment
    }
    throw new ApiError(httpStatus.PAYMENT_REQUIRED, 'Payment Required');
};

const isEmailTaken = async (email) => {
    const query = new firefose.Query().where('email', '==', email)
    const payment = await Payment.findOne(query);
    console.log(payment)
    if (payment) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return false
}

const isCreditTaken = async (creditNumber) => {
    const query = new firefose.Query().where('creditNumber', '==', creditNumber)
    const payment = await Payment.findOne(query);
    if (payment) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Credit number already taken');
    }
    return false
}

const isPhoneTaken = async (phone) => {
    const query = new firefose.Query().where('phonenum', '==', phone)
    const payment = await Payment.findOne(query);
    if (payment) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already taken');
    }
    return false
}

const createStripe = async (userInfo) => {
    const { email, phoneNumber, creditNumber, year, month } = userInfo
    const stripe = require('stripe')('sk_test_51NEy83KIejK4eAPNZBnQaipRHb1UhyueK6o1Xf89a8dlvYFHN93ELhWKJCEksY5rio67hDdZcxFKIhdN9PX38qY0002X8ukfya');
    let customer;

    const customers = await stripe.customers.list({
        email: email,
    });
    console.log(customers)
    const { data } = customers;

    if (data.length > 0) {
        customer = data[0];
    } else {
        customer = await stripe.customers.create({
            description: '',
            email: email,
            phone: phoneNumber,
        });
    }

    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number: creditNumber,
            exp_month: month,
            exp_year: '20' + year,
            cvc: '314',
        },
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 500,
        currency: 'JPY',
        customer: customer.id,
        payment_method_types: ['card'],
        payment_method: paymentMethod.id,
    });

    const confirmIntent = await stripe.paymentIntents.confirm(
        paymentIntent.id,
        { payment_method: paymentMethod.id }
    );
    console.log(confirmIntent)
    return true;
}

module.exports = {
    createPayment,
    isEmailTaken,
    isCreditTaken,
    isPhoneTaken,
    createStripe
};
