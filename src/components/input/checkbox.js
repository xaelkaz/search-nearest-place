import React from 'react'

const Checkbox = ({ type = 'checkbox', name, checked, onChange }) => (
  <label>
    <input
      type={type}
      checked={checked}
      onChange={onChange}
      style={{ marginRight: 10 }}
    />
    {name}
  </label>
)

export default Checkbox
