import React from 'react'

interface Props {
  className?: string,
}

function LikeIcon({className}: Props) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9298 13.5968C19.3303 13.074 19.5224 12.5136 19.4979 11.9364C19.4734 11.3007 19.1955 10.803 18.9666 10.4977C19.2322 9.82016 19.3344 8.75366 18.4475 7.92555C17.7976 7.31911 16.694 7.04726 15.1653 7.12254C14.0904 7.17273 13.1912 7.37767 13.1544 7.38603H13.1503C12.9459 7.42367 12.7293 7.46968 12.5086 7.51987C12.4922 7.2522 12.5372 6.5872 13.0195 5.08992C13.5917 3.30824 13.559 1.94479 12.9132 1.03304C12.2347 0.0752824 11.1516 0 10.8328 0C10.5262 0 10.2442 0.129653 10.0439 0.368047C9.59022 0.90757 9.64336 1.90297 9.70058 2.36303C9.16105 3.84358 7.64874 7.47386 6.36941 8.48181C6.34488 8.49854 6.32445 8.51945 6.30401 8.54036C5.92798 8.94605 5.67456 9.38519 5.50289 9.76997C5.26174 9.63614 4.98789 9.56085 4.6936 9.56085H2.20033C1.26024 9.56085 0.5 10.343 0.5 11.3007V18.097C0.5 19.059 1.26433 19.8369 2.20033 19.8369H4.6936C5.05737 19.8369 5.39662 19.7198 5.67456 19.519L6.63508 19.6361C6.78223 19.657 9.39812 19.9958 12.0835 19.9414C12.5699 19.9791 13.0277 20 13.4528 20C14.1844 20 14.822 19.9414 15.3534 19.8243C16.6041 19.5525 17.4583 19.0088 17.8916 18.21C18.2227 17.5993 18.2227 16.9929 18.1695 16.6081C18.9829 15.8553 19.126 15.023 19.0974 14.4375C19.081 14.0987 19.0074 13.8101 18.9298 13.5968ZM2.20033 18.7077C1.86926 18.7077 1.60358 18.4316 1.60358 18.097V11.2965C1.60358 10.9578 1.87334 10.6859 2.20033 10.6859H4.6936C5.02468 10.6859 5.29035 10.9619 5.29035 11.2965V18.0928C5.29035 18.4316 5.02059 18.7035 4.6936 18.7035H2.20033V18.7077ZM17.8834 13.1075C17.7118 13.2915 17.6791 13.5717 17.8098 13.7892C17.8098 13.7934 17.9774 14.0862 17.9979 14.4877C18.0265 15.0355 17.769 15.5207 17.2294 15.9348C17.0373 16.0853 16.9597 16.3446 17.0414 16.5788C17.0414 16.583 17.2172 17.1351 16.9311 17.6579C16.6572 18.1598 16.0482 18.5194 15.1245 18.7202C14.3847 18.8833 13.3792 18.9126 12.1448 18.8122C12.1285 18.8122 12.108 18.8122 12.0876 18.8122C9.45943 18.8708 6.80266 18.5194 6.77405 18.5153H6.76997L6.35715 18.4651C6.38167 18.348 6.39393 18.2225 6.39393 18.097V11.2965C6.39393 11.1167 6.36532 10.941 6.31627 10.7779C6.38984 10.4977 6.59421 9.87453 7.07652 9.34337C8.91173 7.85445 10.7061 2.83145 10.7837 2.61397C10.8164 2.52614 10.8246 2.42995 10.8082 2.33375C10.7388 1.86533 10.7633 1.29235 10.8614 1.12087C11.078 1.12505 11.6625 1.18779 12.014 1.68549C12.4309 2.2752 12.4146 3.32915 11.965 4.72606C11.2783 6.85487 11.2211 7.97574 11.7647 8.46926C12.0344 8.71602 12.3941 8.72857 12.6557 8.63237C12.9051 8.57382 13.1421 8.52363 13.3669 8.48599C13.3833 8.48181 13.4037 8.47762 13.4201 8.47344C14.6749 8.19322 16.9229 8.02175 17.7036 8.74948C18.3657 9.36846 17.8957 10.1882 17.8425 10.276C17.6913 10.5102 17.7363 10.8156 17.9406 11.0038C17.9447 11.0079 18.3739 11.422 18.3943 11.9783C18.4107 12.3505 18.239 12.7311 17.8834 13.1075Z" fill="#6D718C"/>
    </svg>

  )
}

export default LikeIcon
