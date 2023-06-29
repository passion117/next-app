const firefose = require('firefose')
const validator = require('validator');

const paymentSchema = new firefose.Schema(
    {
        email: {
            type: firefose.SchemaTypes.String,
            required: false,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        creditNumber: {
            type: firefose.SchemaTypes.String,
            required: false,
            unique: true,
        },
        phoneNumber: {
            type: firefose.SchemaTypes.String,
            required: true,
            unique: true,
            validate(value) {
                // format must be like: 123456789
                if (!new RegExp(/\d{9}/g).test(value)) {
                    throw new Error('Invalid phone number');
                }
            }
        },
        month: {
            type: firefose.SchemaTypes.String,
            required: false
        },
        year: {
            type: firefose.SchemaTypes.String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const Payment = new firefose.Model('Payment', paymentSchema);

module.exports = Payment;
