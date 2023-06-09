const mongoose = require('mongoose');
const http2 = require('node:http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../moduls/users');

const { ValidationError } = mongoose.Error;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError(`Пользователь с id ${req.params.userId} не найден`))
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

const getUserByMe = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

const postUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const user = await User.findById(createdUser._id);
    return res.status(http2.constants.HTTP_STATUS_CREATED).send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequestError(err.errors.avatar.properties.message));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(err);
  }
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' });
      return res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: 'none',
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
    })
    .send({ message: 'Выход произведен' });
};

const patchUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequestError(err.errors.avatar.properties.message));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUserByMe,
  postUser,
  signIn,
  signOut,
  patchUserProfile,
  patchUserAvatar,
};
