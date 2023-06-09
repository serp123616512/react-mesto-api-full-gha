const mongoose = require('mongoose');
const http2 = require('node:http2');
const Card = require('../moduls/cards');

const { ValidationError } = mongoose.Error;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(cards);
    })
    .catch(next);
};

const postCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;

  try {
    const createdCard = await Card.create({ name, link, owner });
    const card = await Card.findById(createdCard._id).populate('owner').populate('likes');
    return res.status(http2.constants.HTTP_STATUS_CREATED).send(card);
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequestError(err.errors.link.properties.message));
    }
    return next(err);
  }
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`))
    .then((card) => {
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError('Недостаточно прав для удаления данной карточки');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => {
          res.status(http2.constants.HTTP_STATUS_OK).send(card);
        });
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(http2.constants.HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(http2.constants.HTTP_STATUS_OK).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
