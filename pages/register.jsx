import AuthLayout from '../layouts/auth'
import Form from '../components/Form'
import useInput from '../hooks/useInput'
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
}
