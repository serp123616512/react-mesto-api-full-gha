const configApi = {
  baseUrl: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
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
      headers: this._headers,
      credentials: 'include',
    })
  }

  getCardData() {
    return this._request(this._baseUrl + '/cards', {
      headers: this._headers,
      credentials: 'include',
    })
  }

  patchUserInfo({name, vocation}) {
    return this._request(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
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
      credentials: 'include',
      body: JSON.stringify({
        name: title,
        link: link,
      })
    })
  }

  putLike(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
  }

  deleteLike(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'DELETE',
      credentials: 'include',
      headers:this._headers
    })
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
  }

  patchUserAvatar({avatar}) {
    return this._request(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }
}

const api = new Api({configApi});

export default api;
