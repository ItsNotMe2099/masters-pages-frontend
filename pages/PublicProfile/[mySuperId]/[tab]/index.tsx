import TabPage from "pages/PublicProfile/[mySuperId]/[tab]/TabPage";
import * as React from "react";
import { withRestrictAuthSync } from 'utils/auth'

const TabIndexPage = (props) => {
  return (<TabPage {...props}/>)
}

export default TabIndexPage
