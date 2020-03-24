import { useContext } from 'react'
import { observe } from 'mobx'
import Router from 'next/router'

import AuthLayout from '../layouts/auth'
import useInput from '../hooks/useInput'
import Form from '../components/Form'
import AuthStore from '../stores/authStore'
import UserStore from '../stores/userStore'

export default () => {
  const authStore = useContext(AuthStore)
  const userStore = useContext(UserStore)

  observe(userStore, 'currentUser', ({ newValue }) => {
    const currentUser = newValue
    if (currentUser) {
      Router.push('/')
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
