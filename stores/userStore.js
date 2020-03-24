import { observable, action } from 'mobx'
import { createContext } from 'react'

import authService from '../services/auth'

class UserStore {
  @observable currentUser
  @observable loadingUser

  @action async pullUser() {
    this.loadingUser = true
    try {
      const user = await authService.current()
      this.currentUser = user
    } catch (err) {
      alert(err.message)
    }
    this.loadingUser = false
  }

  @action forgetUser() {
    this.currentUser = undefined
  }
}

export const userStore = new UserStore()

export default createContext(userStore)
