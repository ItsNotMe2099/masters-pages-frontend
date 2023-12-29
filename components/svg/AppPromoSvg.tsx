import React from 'react'

interface Props {
  className?: string
  color: string
}

function AppPromoSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="73" height="73" viewBox="0 0 73 73" fill="none">
      <path d="M47.9056 33.9084L36.2526 45.5614L24.5996 33.9084L27.7369 30.7711L34.0116 37.0458V21.8072H38.4935V37.0458L44.7682 30.7711L47.9056 33.9084ZM30.1273 63.2651H42.3779V60.2771H30.1273V63.2651ZM19.8188 69.6145C18.6237 69.6145 17.5779 69.1663 16.6815 68.2699C15.7851 67.3735 15.3369 66.3277 15.3369 65.1325V8.36144C15.3369 7.16626 15.7851 6.12048 16.6815 5.22409C17.5779 4.32771 18.6237 3.87952 19.8188 3.87952H52.6863C53.8815 3.87952 54.9273 4.32771 55.8237 5.22409C56.72 6.12048 57.1682 7.16626 57.1682 8.36144V65.1325C57.1682 66.3277 56.72 67.3735 55.8237 68.2699C54.9273 69.1663 53.8815 69.6145 52.6863 69.6145H19.8188ZM19.8188 58.4096V65.1325H52.6863V58.4096H19.8188ZM19.8188 53.9277H52.6863V15.0843H19.8188V53.9277ZM19.8188 10.6024H52.6863V8.36144H19.8188V10.6024Z" fill={props.color} />
    </svg>
  )
}
AppPromoSvg.defaultProps = {
}

export default AppPromoSvg