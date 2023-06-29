const httpStatus = require('http-status');
const firefose = require('firefose')
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const admin = require('firebase-admin');


const createOrUpdateUserAsPinInfo = async (pins, token) => {
  const userInfo = await getUserInfoFromToken(token)
  console.log(userInfo)
  const query = new firefose.Query().where('phoneNumber', '==', userInfo.phone_number)
  const exist = await User.find(query);
  console.log("exist", exist)
  var user;
  if (exist && exist.length > 0) {
    user = await User.updateOne(query, { pins: pins })
  } else {
    user = await User.create({ phoneNumber: userInfo.phone_number, pins });
  }
  console.log("user", user)
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'BAD Request');
  }
  return user
}
const getUserInfoFromToken = async (token) => {
  var idToken;
  if (token && token.startsWith('Bearer ')) {
    idToken = token.split(' ')[1]
  }
  const userInfo = await admin.auth().verifyIdToken(idToken);
  return userInfo
}


const UpdateUserAvatar = async (file, token) => {
  const userInfo = await getUserInfoFromToken(token)
  console.log(userInfo)
  const query = new firefose.Query().where('phoneNumber', '==', userInfo.phone_number)
  const exist = await User.find(query);
  console.log("exist", exist)
  var user;
  if (exist) {
    user = await User.updateOne(query, { avatar: file.path })
  } else {
    user = await User.create({ phoneNumber: userInfo.phone_number, avatar: file.path });
  }
  console.log("user", user)
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'BAD Request');
  }
  return user
}

const getUsers = async (token) => {
  // const userInfo = await getUserInfoFromToken(token)
  // if (!userInfo) {
  //   throw new ApiError(httpStatus.FORBIDDEN, "Forbidden, Please re log in");
  // }
  const users = await User.find(new firefose.Query())
  return users
}

module.exports = {
  createOrUpdateUserAsPinInfo,
  UpdateUserAvatar,
  getUsers,
  getUserInfoFromToken
};
