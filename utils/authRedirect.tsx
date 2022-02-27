import Router from "next/router";

export const afterAuthRedirect = () => {
  if((Router.query.redirect as string) ){
    window.location.href = (Router.query.redirect as string) ;
  }else{
    meRedirect();
  }

}
export const meRedirect = () => {
  window.location.href = '/me'
}
