const configAuthApi = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  }
}

class AuthApi {
  constructor({configAuthApi}) {
    this._baseUrl = configAuthApi.baseUrl;
    this._headers = configAuthApi.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  signUp({email, password}) {
    return this._request(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  signIn({email, password}) {
    return this._request(this._baseUrl + '/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  checkToken({token}){
    return this._request(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
  }
}

const auth = new AuthApi({configAuthApi});

export default auth;
