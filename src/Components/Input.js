import React from 'react';
import './Input.css';

const Input = ({ id, label, value, setState, prefix, ...props }) => {
  const handleChange = ({ target }) => {
    setState(target.value);
  };

  return (
    <>
      <label htmlFor={id}>
        {label}
        <input
          value={value}
          onChange={handleChange}
          id={id}
          type='number'
          {...props}
        />
      </label>
    </>
  );
};

export default Input;
