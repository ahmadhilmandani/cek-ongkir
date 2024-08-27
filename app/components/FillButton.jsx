import { TailSpin } from "react-loader-spinner";

export default function FillButton({ buttonStyle, children, handleOnClick, isLoading = false }) {
  return (
    <>
      <button onClick={handleOnClick} className={isLoading === true ? 'cursor-not-allowed' : buttonStyle === 'primary' ? 'btn-primary' : buttonStyle === 'btn-secondary' ? 'btn-secondary' : buttonStyle === 'btn-muted' ? 'btn-muted' : ''}>
        {children}
        {isLoading && <>
          <TailSpin
            visible={true}
            height="20"
            width="20"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="0"
          />
        </>}
      </button>
    </>
  )
}
