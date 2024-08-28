export default function Dropdown({ labelProp, idProp, handleOnInput, children }) {
  return (
    <>
      <label htmlFor={idProp}>
        {labelProp}
      </label>
      <select name="cars" id={idProp} onChange={(e) => { handleOnInput(e) }} >
        {children}
      </select>
    </>
  )
}
