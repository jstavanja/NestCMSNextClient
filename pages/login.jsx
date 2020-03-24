import AuthLayout from '../layouts/auth'
import useInput from '../hooks/useInput'
import Form from '../components/Form'
import { apiURL } from '../constants/api'

export default () => {
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
      loadingText: 'Logging in ...'
    }
  ]

  return (
    <AuthLayout title='Login'>
      NestCMS | Login
      <Form
        fields={formFields}
        actions={actions}
        defaultActionURL={`${apiURL}/login`}
      />
    </AuthLayout>
  )
}
