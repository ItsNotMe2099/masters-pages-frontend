import {changeRole, changeRoleNative, fetchProfileSuccess} from "components/Profile/actions";
import nextCookie from "next-cookies";
import { getDisplayName } from "next/dist/next-server/lib/utils";
import { Component } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import request from "utils/request";
import {wrapper} from 'store';

export const auth = ctx => {
    const { token } = nextCookie(ctx);
    return token;
};

export const logout = () => {
    cookie.remove("token");
    // To trigger the event listener we save some random data into the `logout` key
    //window.localStorage.setItem("logout", Date.now()); // new
    Router.push("/auth/login");
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
  console.log("Query", ctx.req);
 // if(ctx.req.url.includes('RegistrationPage') && ctx.req.query.token){

  //}
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
  if(user && !user.isRegistrationCompleted &&  !ctx.req.url.includes('RegistrationPage')){
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



