import TabPage from "pages/PublicProfile/[mySuperId]/[tab]/TabPage";
import * as React from "react";
import { withTranslation } from "react-i18next";
import { withAuthSync, withRestrictAuthSync } from 'utils/auth'
import { Router, useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfileById } from "components/PublicProfile/actions";

const TabIndexPage = (props) => {

  return (<TabPage {...props}/>)
}

export default withAuthSync(TabIndexPage)
