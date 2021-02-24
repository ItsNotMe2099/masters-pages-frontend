import TabPage from "pages/PersonalArea/[mode]/[tab]/TabPage";
import * as React from "react";
import {getAuthServerSide} from 'utils/auth'

const TabIndexPage = (props) => {
  return (<TabPage {...props}/>)
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default TabIndexPage
