import React from 'react'

export default function InputBox({onChange,value,placeholder}) {
  return (
    <input
      className="border-gray-300 border p-2 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />

  )
}
