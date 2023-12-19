import React from 'react'

interface Props {
  className?: string
  color: string
}

function VolunteerSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 11.9751C10.9 11.9751 10 11.6251 9.3 10.9251C8.6 10.2251 8.25 9.3251 8.25 8.2251C8.25 7.1251 8.6 6.2251 9.3 5.5251C10 4.8251 10.9 4.4751 12 4.4751C13.1 4.4751 14 4.8251 14.7 5.5251C15.4 6.2251 15.75 7.1251 15.75 8.2251C15.75 9.3251 15.4 10.2251 14.7 10.9251C14 11.6251 13.1 11.9751 12 11.9751ZM4 20.0001V17.6501C4 17.0168 4.15833 16.4751 4.475 16.0251C4.79167 15.5751 5.2 15.2334 5.7 15.0001C6.81667 14.5001 7.8875 14.1251 8.9125 13.8751C9.9375 13.6251 10.9667 13.5001 12 13.5001C13.0333 13.5001 14.0583 13.6293 15.075 13.8876C16.0917 14.1459 17.1577 14.5184 18.273 15.0049C18.7947 15.2404 19.213 15.5818 19.5278 16.0291C19.8426 16.4764 20 17.0168 20 17.6501V20.0001H4ZM5.5 18.5001H18.5V17.6501C18.5 17.3834 18.4208 17.1293 18.2625 16.8876C18.1042 16.6459 17.9083 16.4668 17.675 16.3501C16.6083 15.8334 15.6333 15.4793 14.75 15.2876C13.8667 15.0959 12.95 15.0001 12 15.0001C11.05 15.0001 10.125 15.0959 9.225 15.2876C8.325 15.4793 7.35 15.8334 6.3 16.3501C6.06667 16.4668 5.875 16.6459 5.725 16.8876C5.575 17.1293 5.5 17.3834 5.5 17.6501V18.5001ZM12 10.4751C12.65 10.4751 13.1875 10.2626 13.6125 9.8376C14.0375 9.4126 14.25 8.8751 14.25 8.2251C14.25 7.5751 14.0375 7.0376 13.6125 6.6126C13.1875 6.1876 12.65 5.9751 12 5.9751C11.35 5.9751 10.8125 6.1876 10.3875 6.6126C9.9625 7.0376 9.75 7.5751 9.75 8.2251C9.75 8.8751 9.9625 9.4126 10.3875 9.8376C10.8125 10.2626 11.35 10.4751 12 10.4751Z" fill={props.color} />
    </svg>
  )
}
VolunteerSvg.defaultProps = {
}

export default VolunteerSvg
