import { useState } from 'react'

const useInput = ({ type, name, placeholder }) => {
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

export default useInput;
