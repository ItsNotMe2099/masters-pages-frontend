import TabPage from "pages/PublicProfile/[mySuperId]/[tab]/TabPage";
import * as React from "react";
import {getAuthServerSide} from "../../../../utils/auth";

const TabIndexPage = (props) => {
  return (<TabPage {...props}/>)
}
export const getServerSideProps = getAuthServerSide();
export default TabIndexPage
