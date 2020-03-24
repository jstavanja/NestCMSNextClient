import AuthLayout from '../layouts/auth'
import useInput from '../hooks/useInput'
import { success } from 'fake-promise-util'
import { useState } from 'react'

export default () => {
  const [loading, setLoading] = useState(false)
  const [username, usernameInput] = useInput({
    type: 'text',
    name: 'username',
    placeholder: 'JohnDoe'
  })
  const [password, passwordInput] = useInput({
    type: 'password',
    name: 'password',
    placeholder: '************'
  })

  const onFormSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    console.log('username', username)
    console.log('password', password)
    await success('Test', 2000)
    setLoading(false)
  }

  return (
    <AuthLayout title='Login'>
      <form>
        <h1>NestCMS | Login</h1>
        <div>
          <label>👩‍💻 Username</label>
          {usernameInput}
        </div>
        <div>
          <label>🔐 Password</label>
          {passwordInput}
        </div>
        <button type='submit' onClick={onFormSubmit}>
          {loading ? '⏳ Logging in ...' : '🔑 Log in'}
        </button>
      </form>

      <style jsx global>{`
        form {
          margin: 0 auto;
          margin-top: 100px;
          padding: 25px;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.1);
          max-width: 500px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        form div {
          width: 100%;
          margin-bottom: 10px;
        }

        form label {
          font-size: 1rem;
          display: block;
          margin-right: 10px;
          margin-bottom: 10px;
        }

        form input {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        form button {
          cursor: pointer;
          margin-top: 25px;
          padding: 5px 10px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          font-size: 1.25rem;
          font-family: inherit;
          transform: scale(1);
          transition: all 0.05s ease-in;
        }

        form button:hover {
          transform: scale(1.1);
        }

        form button:active {
          transform: scale(1.2);
        }
      `}</style>
    </AuthLayout>
  )
}
