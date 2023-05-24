import React, { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onTrashClick, onCardLike, onCardDislike}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(owner => owner._id === currentUser._id);

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__trash button-hover"
          onClick={() => onTrashClick(card._id)}
        />
      )}
      <img
        className="card__pic"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <p className="card__name">{card.name}</p>
        <div className="card__likes">
          <button
            className={`card__like button-hover ${isLiked && 'card__like_active'}`}
            onClick={() => isLiked ? onCardDislike(card._id) : onCardLike(card._id)}
          />
          <p className="card__likes-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
