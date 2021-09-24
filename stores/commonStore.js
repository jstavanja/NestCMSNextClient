import { observable, action, reaction } from 'mobx'
import { createContext } from 'react'

import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../constants/auth'

class CommonStore {
  @observable token = null
  @observable appLoaded = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = window.localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
    }

    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token)
        } else {
          window.localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
        }
      }
    )
  }

  @action setToken(token) {
    this.token = token
  }

  @action setAppLoaded() {
    this.appLoaded = true
  }
}

export const commonStore = new CommonStore()

export default createContext(commonStore)
