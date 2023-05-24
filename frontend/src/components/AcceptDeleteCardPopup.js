import React from "react";

import PopupWithForm from "./PopupWithForm.js";

function AcceptDeleteCardPopup({cardId, isOpen, onClose, onAcceptDeleteCard}) {

  function handleSubmit(e) {
    e.preventDefault();

    onAcceptDeleteCard(cardId);

    e.target.reset();
  }

  return (
    <PopupWithForm
      name="trash-accept"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Да"
    />
  )
}

export default AcceptDeleteCardPopup;
