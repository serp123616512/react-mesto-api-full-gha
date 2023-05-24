import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <section id="picture" className={`popup popup_dark ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container-pic">
        <button className="popup__close-btn button-hover" onClick={onClose}></button>
        <img className="popup__pic" src={card.link} alt={card.name} />
        <p className="popup__title">{card.name}</p>
      </div>
    </section>
  )
};

export default ImagePopup;
