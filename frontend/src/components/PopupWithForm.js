import React, { useRef } from "react";

function PopupWithForm({
    name,
    title,
    isOpen,
    onClose,
    onSubmit,
    children,
    submitButtonText
  }) {

  const form = useRef('')

  return (
    <section id={name} className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn button-hover"
          onClick={() => {
            onClose();
            form.current.reset();
          }}
        />
        <form
          name={`${name}-form`}
          className="popup__content"
          onSubmit={onSubmit}
          ref={form}
        >
          <h1 className="popup__heading">{title}</h1>
          {children}
          <button className="popup__accept button-hover" type="submit">{submitButtonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;
