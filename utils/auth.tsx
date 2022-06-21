import nextCookie from "next-cookies";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import request from "utils/request";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {CookiesType} from 'types/enums'
 const auth = ctx => {
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
    console.log("GetProfileRole", role);
    const res = await request({ url: `/api/profile/role/${role}`, token , method: 'GET' })
    if(res.err){
      return;
    }
    return res.data;
  }catch (e) {
    console.error("ErrorCurrentProfile", e);
  }
}

export const getAuthServerSide = ({redirect}: {redirect?: boolean} = {}) => (async (ctx) => {
  console.log("Localeee", ctx.locale);

  const translationProps =  await serverSideTranslations(ctx.locale, ['common', 'footer', 'header']);

  const token = auth(ctx);

  //if (ctx.req && ['masterspages.ca', 'masterspages.com', 'masterspages.ru'].includes(ctx.req.headers.host) && (!ctx.req.url || ctx.req.url === '/')) {
 //   ctx.res.writeHead(302, {Location: "/"});
  //  ctx.res.end();
 //   return;
 // }

  const mode = nextCookie(ctx)?.mode || 'client';
  const user = token ? await getUser(token) : null

  if(!user && redirect){
    ctx.res.writeHead(302, { Location: `/login?redirect=${ctx.req.url}` });
    ctx.res.end();
    return;
  }
  if(!user){
    return {props: {...translationProps}};
  }
  if(user && !user.isRegistrationCompleted && (redirect) &&  !ctx.req.url.includes('registration')){
    ctx.res.writeHead(302, { Location: "/registration" });
    ctx.res.end();
    return;
  }
  if(user && user.isRegistrationCompleted && (ctx.req.url.includes('registration') && !ctx.req.url.includes('.json'))){
    ctx.res.writeHead(404, { Location: "/" });
    ctx.res.end();
    return;
  }
    console.log("userProfiles", user.profiles[0])

  if(user.profiles.length === 0 && user.isRegistrationCompleted){
    //Недостежимый кейс но может случиться
    destroyCookie(ctx, CookiesType.profileRole);
    destroyCookie(ctx, CookiesType.accessToken);
    return {props: {...translationProps}};
  }
  const profile = token && user && user.isRegistrationCompleted ? await getProfile(token, user.profiles.find(profile => profile.role === mode) ? mode : user.profiles[0].role) : null;
 console.log("profile1111", profile?.role, mode, user.profiles);
  if(profile && profile.role !== mode){
    setCookie(ctx, 'mode', profile.role, {
      maxAge: 60*60*24*365,
      path: '/',
    })
  }
  if (ctx.req && profile) {
  //  ctx.store.dispatch(changeRoleNative(mode));
 //   ctx.store.dispatch(fetchProfileSuccess(profile));
  }

  return {props: { ...translationProps, token, user, mode, ...(profile ? {currentProfile: profile} : {})}};
})



