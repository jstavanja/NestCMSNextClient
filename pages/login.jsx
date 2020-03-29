import { useContext, useEffect } from 'react'
import { observe } from 'mobx'
import Router from 'next/router'

import AuthLayout from '../layouts/auth'
import useInput from '../hooks/useInput'
import Form from '../components/Form'
import AuthStore from '../stores/authStore'
import UserStore from '../stores/userStore'
import CommonStore from '../stores/commonStore'

export default () => {
  const authStore = useContext(AuthStore)
  const userStore = useContext(UserStore)
  const commonStore = useContext(CommonStore)

  const pullUser = async () => {
    if (commonStore.token) {
      await userStore.pullUser()
      await commonStore.setAppLoaded()
    }
  }

  useEffect(() => {
    pullUser()
  })

  observe(userStore, 'currentUser', ({ newValue }) => {
    const currentUser = newValue
    if (currentUser) {
      Router.push('/admin')
    }
  })

  const formFields = [
    {
      label: '👩‍💻 Username',
      input: useInput({
        type: 'text',
        name: 'username',
        placeholder: 'JohnDoe'
      })
    },
    {
      label: '🔐 Password',
      input: useInput({
        type: 'password',
        name: 'password',
        placeholder: '************'
      })
    }
  ]

  const actions = [
    {
      type: 'submit',
      text: 'Log in',
      loadingText: 'Logging in ...',
      onClickCallback: ({ username, password }) => {
        authStore.login(username, password)
      }
    }
  ]

  return (
    <AuthLayout title='Login'>
      NestCMS | Login
      <Form fields={formFields} actions={actions} />
    </AuthLayout>
  )
}
