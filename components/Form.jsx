import { useState } from 'react'
import { success } from 'fake-promise-util'

import Button from './Button'

export default ({ fields, actions = [], defaultActionURL }) => {
  const [loading, setLoading] = useState(false)
  const onFormSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    const fieldsAndValues = fields.reduce((currentObject, { input }) => {
      const [value, , name] = input
      currentObject[name] = value
      return currentObject
    }, {})
    console.log(fieldsAndValues)
    console.log(defaultActionURL)
    await success('Test', 2000)
    setLoading(false)
  }
  return (
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
        {actions.map(({ type, text, loadingText, onClick }) => {
          return (
            <Button
              key={text}
              type={type}
              text={loading ? loadingText : text}
              onClick={onClick ? onClick : onFormSubmit}
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
  )
}
