import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Register from "./Register.js";
import Login from "./Login.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import AcceptDeleteCardPopup from "./AcceptDeleteCardPopup.js";
import InfoTooltip from "./InfoTooltip.js";

import api from "../utils/api.js";
import auth from "../utils/auth.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAcceptDeleteCardPopupOpen, setIsAcceptDeleteCardPopupOpen] = useState(false);
  const [cardId, setCardId] = useState('');

  const [isAcceptRegisterPopupOpen, setIsAcceptRegisterPopupOpen] = useState(false);
  const [isDeclineRegisterPopupOpen, setIsDeclineRegisterPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleTrashClick(cardId) {
    setIsAcceptDeleteCardPopupOpen(true);
    setCardId(cardId);
  }

  function handleUpdateAvatar({avatar}) {
    api
    .patchUserAvatar({avatar})
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(console.log);
  }

  function handleUpdateUser({name, vocation}) {
    api
    .patchUserInfo({name, vocation})
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(console.log);
  }

  function handleAddPlace({title, link}) {
    api
    .postCard({title, link})
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(console.log);
  }

  function handleAcceptDeleteCard(cardId) {
    api
    .deleteCard(cardId)
    .then(() => {
      setCards(cards => cards.filter((c) => c._id !== cardId));
      closeAllPopups();
    })
    .catch(console.log);
  }

  function handleCardLike(cardId) {
    api
    .putLike(cardId)
    .then(newCard => {
      setCards(cards => cards.map(c => c._id === cardId ? newCard : c));
    })
    .catch(console.log);
  }

  function handleCardDislike(cardId) {
    api
    .deleteLike(cardId)
    .then(newCard => {
      setCards(cards => cards.map(c => c._id === cardId ? newCard : c));
    })
    .catch(console.log);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsAcceptDeleteCardPopupOpen('');
    setIsAcceptRegisterPopupOpen(false);
    setIsDeclineRegisterPopupOpen(false);
  }

  useEffect(() => { if (loggedIn) {
    Promise.all([api.getUserData(), api.getCardData()])
    .then(([userData, cardData]) => {
      setCurrentUser(userData);
      setCards(cardData);
    })
    .catch(console.log);}
  }, [loggedIn]);

  function handleLoginClick({email, password}) {
    auth
    .signIn({email, password})
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      setEmail(email);
      setLoggedIn(true);
      navigate('/', {replace: true})
    })
    .catch(console.log);
  }

  function handleRegisterClick({email, password}) {
    auth
    .signUp({email, password})
    .then(res => setIsAcceptRegisterPopupOpen(true))
    .catch(err => setIsDeclineRegisterPopupOpen(true));
  }

  function handleLogoutClick() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      auth
      .checkToken({token})
      .then(res => {
        setEmail(res.data.email);
        setLoggedIn(true);
        navigate('/', {replace: true})
      })
      .catch(console.log);
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        email={email}
        signOut={handleLogoutClick}
        LoginText="Войти"
        LogoutText="Выйти"
        RegisterText="Зарегистрироваться"
      />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleAvatarClick}
            onEditProfile={handleProfileClick}
            onAddPlace={handleAddCardClick}
            cards={cards}
            onCardClick={handleCardClick}
            onTrashClick={handleTrashClick}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
          />
        } />
        <Route path="/sign-up" element={<Register onRegister={handleRegisterClick} />} />
        <Route path="/sign-in" element={<Login onLogin={handleLoginClick} />} />
      </Routes>
      <Footer />
      {/*  Popups  */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <AcceptDeleteCardPopup
        cardId={cardId}
        isOpen={isAcceptDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onAcceptDeleteCard={handleAcceptDeleteCard}
      />
      <InfoTooltip
        isOpen={isAcceptRegisterPopupOpen}
        onClose={() => {
          closeAllPopups();
          navigate('/', {replace: true});
        }}
        isAccept={true}
        infoText="Вы успешно зарегистрировались!"
      />
      <InfoTooltip
        isOpen={isDeclineRegisterPopupOpen}
        onClose={closeAllPopups}
        isAccept={false}
        infoText="Что-то пошло не так! Попробуйте ещё раз."
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
