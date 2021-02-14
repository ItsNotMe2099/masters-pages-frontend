import { changeRole, changeRoleNative } from "components/Profile/actions";
import nextCookie from "next-cookies";
import { getDisplayName } from "next/dist/next-server/lib/utils";
import { Component } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import { store } from "store";
import request from "utils/request";


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
    const res = await request({ url: '/api/auth/currentUser', token, method: 'GET' })
    if(res.err){
      return;
    }
    return res.data;
  }catch (e) {
    console.error("ErrorCurrentUser", e);
  }
}
const getProfile = async (token) => {
  try {
    const res = await request({ url: '/api/profile', token , method: 'GET' })
    if(res.err){
      return;
    }
    return res.data;
  }catch (e) {
    console.error("ErrorCurrentProfile", e);
  }
}
export const withAuthSync = (WrappedComponent) =>
    class extends Component {
        static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

        static async getInitialProps(ctx) {
            const token = auth(ctx);

         if(ctx.req && ctx.req.headers.host === 'masterspages.ca' &&  ctx.req.url !== 'ComingSoon'){
            ctx.res.writeHead(302, { Location: "/ComingSoon" });
            ctx.res.end();
            return;
          }

            const user = token ? await getUser(token) : null
            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx));

            return { ...componentProps, token, user };
        }

        // New: We bind our methods
        constructor(props) {
            super(props);

            this.syncLogout = this.syncLogout.bind(this);
        }

        // New: Add event listener when a restricted Page Component mounts
        componentDidMount() {
            window.addEventListener("storage", this.syncLogout);
            console.log("Did mount")
          if(!cookie.get('mode')){
            cookie.set('mode', 'client')
          }
          store.dispatch(changeRoleNative(cookie.get('mode') || 'client'));
        }

        // New: Remove event listener when the Component unmount and
        // delete all data
        componentWillUnmount() {
            window.removeEventListener("storage", this.syncLogout);
            window.localStorage.removeItem("logout");
        }

        // New: Method to redirect the user when the event is called
        syncLogout(event) {
            if (event.key === "logout") {
                console.log("logged out from storage!");
                Router.push("/login");
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };


export const withRestrictAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withRestrictAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {

      const token = auth(ctx);
      const user = token ? await getUser(token) : null
      console.log("req host", ctx.req );

      if(ctx.req && ctx.req.headers.host === 'masterspages.ca' &&  ctx.req.url !== 'ComingSoon'){
        ctx.res.writeHead(302, { Location: "/ComingSoon" });
        ctx.res.end();
        return;
      }

      if (ctx.req && (!token || !user)) {
          ctx.res.writeHead(302, { Location: "/login" });
          ctx.res.end();
          return;
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token, user };
    }

    // New: We bind our methods
    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
      store.dispatch(changeRole(cookie.get('mode') || 'client'));
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    // New: Method to redirect the user when the event is called
    syncLogout(event) {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
