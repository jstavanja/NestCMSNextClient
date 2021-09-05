import { useObserver } from 'mobx-react'
import { useContext } from 'react'

import Button from './Button'
import AuthStore from '../stores/authStore'

const Form = ({ fields, actions = [] }) => {
  const authStore = useContext(AuthStore)

  const onFormSubmit = onClickCallback => {
    return event => {
      event.preventDefault()
      const fieldsAndValues = fields.reduce((currentObject, { input }) => {
        const [value, , name] = input
        currentObject[name] = value
        return currentObject
      }, {})
      if (onClickCallback) {
        onClickCallback(fieldsAndValues)
      }
    }
  }

  return useObserver(() => (
    <>
      <form>
        {/* Render form fields */}
        {fields.map(field => {
          const { label, input } = field
          const [, inputElement] = input
          return (
            <div key={label}>
              <label>{label}</label>
              {inputElement}
            </div>
          )
        })}

        {/* Render form buttons */}
        {actions.map(({ type, text, loadingText, onClickCallback }) => {
          return (
            <Button
              key={text}
              type={type}
              text={authStore.inProgress ? loadingText : text}
              onClick={onFormSubmit(onClickCallback)}
            />
          )
        })}
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

        button {
          margin-top: 25px;
        }
      `}</style>
    </>
  ))
};

export default Form;
