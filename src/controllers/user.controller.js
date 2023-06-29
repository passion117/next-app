const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body, req.headers.authorization);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.headers.authorization)
  res.send(users)
});


const createOrUpdateUserAsPinInfo = catchAsync(async (req, res) => {
  console.log(req.body.pins, req.headers.authorization)
  const user = await userService.createOrUpdateUserAsPinInfo(req.body.pins, req.headers.authorization);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.CREATED).send(user);
});

const UpdateUserAvatar = catchAsync(async (req, res) => {
  const user = await userService.UpdateUserAvatar(req.file, req.headers.authorization);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  createOrUpdateUserAsPinInfo,
  getUsers,
  UpdateUserAvatar,
  deleteUser,
};
