const firefose = require('firefose')
const validator = require('validator');

const userSchema = new firefose.Schema(
  {
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
    avatar: {
      type: firefose.SchemaTypes.String,
      required: false,
      unique: false,
      default: '',
    },
    pins: {
      type: firefose.SchemaTypes.Array,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const User = new firefose.Model('User', userSchema);

module.exports = User;
