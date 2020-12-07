import TabPage from "pages/PersonalArea/[mode]/[tab]/TabPage";
import * as React from "react";
import { withRestrictAuthSync } from 'utils/auth'

const TabIndexPage = (props) => {
  return (<TabPage/>)
}

export default withRestrictAuthSync(TabIndexPage)
