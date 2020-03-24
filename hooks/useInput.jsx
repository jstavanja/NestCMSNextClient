import { useState } from 'react'

export default ({ type, name, placeholder }) => {
  const [value, setValue] = useState('')
  const input = (
    <input
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      type={type}
    />
  )
  return [value, input, name]
}
