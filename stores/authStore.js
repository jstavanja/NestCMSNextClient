import { observable, action } from 'mobx'
import authService from '../services/auth'
import { userStore } from './userStore'
import { commonStore } from './commonStore'
import { createContext } from 'react'

class AuthStore {
  @observable inProgress = false
  @observable errors = undefined

  @action async login(username, password) {
    this.inProgress = true
    this.errors = undefined

    try {
      const { token } = await authService.login(username, password).json()
      if (token) {
        commonStore.setToken(token)
        userStore.pullUser()
      } else {
        this.errors = ['Incorrect credentials']
      }
    } catch (err) {
      action(err => {
        this.errors =
          err.response && err.response.body && err.response.body.errors
        throw err
      })
      return Promise.reject()
    }

    this.inProgress = false

    return Promise.resolve()
  }

  @action async register(username, email, password) {
    this.inProgress = true
    this.errors = undefined

    try {
      const { token } = await authService.register(username, email, password)
      commonStore.setToken(token)
      userStore.pullUser()
    } catch (err) {
      action(err => {
        this.errors =
          err.response && err.response.body && err.response.body.errors
        throw err
      })
      return Promise.reject()
    }

    this.inProgress = false

    return Promise.resolve()
  }

  @action logout() {
    commonStore.setToken(undefined)
    userStore.forgetUser()
    return Promise.resolve()
  }
}

export const instance = new AuthStore()

export default createContext(instance)
