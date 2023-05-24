const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '784482db-5b37-4870-8977-f645f2f9f48d',
    'Content-Type': 'application/json',
  }
}

class Api {
  constructor({configApi}) {
    this._baseUrl = configApi.baseUrl;
    this._headers = configApi.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserData() {
    return this._request(this._baseUrl + '/users/me', {
      headers: this._headers
    })
  }

  getCardData() {
    return this._request(this._baseUrl + '/cards', {
      headers: this._headers
    })
  }

  patchUserInfo({name, vocation}) {
    return this._request(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: vocation,
      })
    })
  }

  postCard({title, link}) {
    return this._request(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      })
    })
  }

  putLike(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLike(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'DELETE',
      headers:this._headers
    })
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  patchUserAvatar({avatar}) {
    return this._request(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }
}

const api = new Api({configApi});

export default api;
