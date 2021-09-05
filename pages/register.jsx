import { useEffect, useContext } from 'react'

import AuthLayout from '../layouts/auth'
import Form from '../components/Form'
import useInput from '../hooks/useInput'
import { apiURL } from '../constants/api'
import UserStore from '../stores/userStore'
import CommonStore from '../stores/commonStore'
import { observe } from 'mobx'
import Router from 'next/router'

const Register = () => {
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
    },
    {
      label: '🔐 Password (again)',
      input: useInput({
        type: 'password',
        name: 'repeated-password',
        placeholder: '************'
      })
    }
  ]

  const actions = [
    {
      type: 'submit',
      text: 'Register',
      loadingText: 'Registering ...'
    }
  ]

  return (
    <AuthLayout title='Register'>
      NestCMS | Register
      <Form
        fields={formFields}
        actions={actions}
        defaultActionURL={`${apiURL}/register`}
      />
    </AuthLayout>
  )
};

export default Register;
