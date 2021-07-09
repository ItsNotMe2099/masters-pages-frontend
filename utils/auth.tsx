import {changeRole, changeRoleNative, fetchProfileSuccess} from "components/Profile/actions";
import nextCookie from "next-cookies";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import request from "utils/request";
import {wrapper} from 'store';
import Router from "next/router";
export const auth = ctx => {
    const { token } = nextCookie(ctx);
    return token;
};

const getUser = async (token) => {
  try {
    const res = await request({ url: '/api/auth/currentUser', token, method: 'GET' })
    if(res.err){
      return;
    }

    return res.data;
  }catch (e) {
    console.error("ErrorCurrentUser", e);
  }
}
const getProfile = async (token, role) => {
  try {
    const res = await request({ url: `/api/profile/role/${role}`, token , method: 'GET' })
    if(res.err){
      return;
    }
    return res.data;
  }catch (e) {
    console.error("ErrorCurrentProfile", e);
  }
}

export const getAuthServerSide = ({redirect}: {redirect?: boolean} = {}) => wrapper.getServerSideProps(async (ctx) => {
  const token = auth(ctx);

  if (ctx.req && ['masterspages.ca', 'masterspages.com', 'masterspages.ru'].includes(ctx.req.headers.host) && (!ctx.req.url || ctx.req.url === '/')) {
    ctx.res.writeHead(302, {Location: "/"});
    ctx.res.end();
    return;
  }
  console.log("token", token)
  const mode = nextCookie(ctx)?.mode || 'client';
  const user = token ? await getUser(token) : null
  console.log("AuthUSer", user);

  if(!user && redirect){
    ctx.res.writeHead(302, { Location: `/login?redirect=${ctx.req.url}` });
    ctx.res.end();
    return;
  }
  if(!user){
    return {props: {}};
  }
  if(user && !user.isRegistrationCompleted && (redirect) &&  !ctx.req.url.includes('RegistrationPage')){
    ctx.res.writeHead(302, { Location: "/RegistrationPage" });
    ctx.res.end();
    return;
  }
  if(user && user.isRegistrationCompleted && ctx.req.url.includes('RegistrationPage')){
    ctx.res.writeHead(404, { Location: "/" });
    ctx.res.end();
    return;
  }


  if(user.profiles.length === 0 && user.isRegistrationCompleted){
    //Недостежимый кейс но может случиться
    destroyCookie(ctx, 'mode');
    destroyCookie(ctx, 'token');
    return {props: {}};
  }
  const profile = token && user && user.isRegistrationCompleted ? await getProfile(token, user.profiles.find(profile => profile.role === mode) ? mode : user.profiles[0].role) : null;

  if(profile && profile.role !== mode){
    setCookie(ctx, 'mode', profile.role, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }
  if (ctx.req && profile) {
    ctx.store.dispatch(changeRoleNative(mode));
    ctx.store.dispatch(fetchProfileSuccess(profile));
  }

  return {props: { token, user, ...(profile ? {profile} : {})}};
})



export const afterAuthRedirect = () => {
  if((Router.query.redirect as string) ){
    window.location.href = (Router.query.redirect as string) ;
  }else{
    meRedirect();
  }

}
export const meRedirect = () => {
  Router.push("/me");
}
