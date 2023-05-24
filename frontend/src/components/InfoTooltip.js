import React from "react";

function InfoTooltip({isOpen, onClose, isAccept, infoText}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn button-hover"
          onClick={onClose}
        />
        <div className={`popup__info-img ${isAccept ? 'popup__info-img_type_accept' : 'popup__img_type_decline'}`} />
        <span className="popup__info-text">{infoText}</span>
      </div>
    </section>
  )
}

export default InfoTooltip;
