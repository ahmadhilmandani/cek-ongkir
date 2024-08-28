export default function Input({ labelProp, idProp, placeholderProp, inputType, inputVal, handleOnInput }) {
  return (
    <>
      <label htmlFor={idProp}>
        {labelProp}
      </label>
      <input type={inputType} id={idProp} placeholder={placeholderProp} value={inputVal} onChange={(e)=>{handleOnInput(e)}} />
    </>
  )
}
