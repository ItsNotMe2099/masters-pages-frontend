import TabPage from "pages/PublicProfile/[mySuperId]/[tab]/TabPage";
import * as React from "react";
import { withTranslation } from "react-i18next";
import {getAuthServerSide} from 'utils/auth'
import { Router, useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfileById } from "components/PublicProfile/actions";
import {wrapper} from "../../../store";
import request from "../../../utils/request";

const TabIndexPage = (props) => {

  return (<TabPage {...props}/>)
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  console.log("CTX", ctx.query);
  const data = await request({ url: `/api/profile/${ctx.query.mySuperId}`, method: 'GET' })
  console.log("PublicProfile", res);
  return {props: {...(res as any).props, profile: data.data}};
});
export default TabIndexPage
