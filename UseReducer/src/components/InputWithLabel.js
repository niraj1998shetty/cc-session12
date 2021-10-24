import React from 'react'

const InputWithLabel=({value,id,children,type,onInputChange})=>{
    return <>
      <label htmlFor={id}>{children} </label>
            <input type={type} id={id} value={value} onChange={onInputChange}></input>
    </>
}
export default InputWithLabel;