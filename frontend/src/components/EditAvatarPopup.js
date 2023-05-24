import React, { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateUser}) {
  const avatar = useRef('')

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      avatar: avatar.current.value || ''
    })
  }

  useEffect(() => {
    avatar.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Сохранить"
    >
      <input
        id="avatar-link"
        className="popup__input-text"
        type="url"
        placeholder="Ссылка на новый аватар"
        required
        ref={avatar}
        defaultValue=""
      />
      <span id="avatar-link-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
