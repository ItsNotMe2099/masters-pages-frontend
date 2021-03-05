import {changeRole, changeRoleNative, fetchProfileSuccess} from "components/Profile/actions";
import nextCookie from "next-cookies";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import request from "utils/request";
import {wrapper} from 'store';

export const auth = ctx => {
  if((ctx.req.url.includes('RegistrationPage') || ctx.req.url === '/' || !ctx.req.url)  && ctx.query.token){
    setCookie(ctx, 'token', ctx.query.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
      return ctx.query.token;
  }
    const { token } = nextCookie(ctx);
    return token;
};

const getUser = async (token) => {
  try {
    console.log("getUser", token);
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

  if (ctx.req && ['masterspages.ca', 'masterspages.com'].includes(ctx.req.headers.host) && ctx.req.url !== 'ComingSoon') {
    ctx.res.writeHead(302, {Location: "/ComingSoon"});
    ctx.res.end();
    return;
  }
  console.log("Query", ctx.query);

  const { mode } = nextCookie(ctx);
  console.log("get Init", mode);
  const user = token ? await getUser(token) : null
  if(!user && redirect){
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }
  if(!user){
    return {props: {}};
  }
  if(user && !user.isRegistrationCompleted && redirect &&  !ctx.req.url.includes('RegistrationPage')){
    ctx.res.writeHead(302, { Location: "/RegistrationPage" });
    ctx.res.end();
  }
  if(user && user.isRegistrationCompleted && ctx.req.url.includes('RegistrationPage')){
    ctx.res.writeHead(404, { });
    ctx.res.end();
  }
  const profile = token && user ? await getProfile(token, mode || 'client') : null;
  console.log("url", ctx.req.url)

  if (ctx.req && profile) {

    ctx.store.dispatch(changeRoleNative(mode || 'client'));
    ctx.store.dispatch(fetchProfileSuccess(profile));
  }
  return {props: { token, user, ...(profile ? {profile} : {})}};
})



