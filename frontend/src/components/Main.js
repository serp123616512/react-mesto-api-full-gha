import React, { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Card from "./Card.js";

function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onTrashClick,
    onCardLike,
    onCardDislike
  }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Твой аватар."
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__intro">
            <p className="profile__name">{currentUser.name}</p>
            <button className="profile__edit-btn button-hover" onClick={onEditProfile} />
            <p className="profile__vocation">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn button-hover" onClick={onAddPlace} />
      </section>
      <section className="places">
        <ul className="cards">
          {cards.map(card => {
            return(
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onTrashClick={onTrashClick}
                onCardLike={onCardLike}
                onCardDislike={onCardDislike}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
