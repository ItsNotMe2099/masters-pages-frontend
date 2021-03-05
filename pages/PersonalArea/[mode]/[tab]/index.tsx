import * as React from "react";
import {getAuthServerSide} from 'utils/auth'
import dynamic from "next/dynamic";
const TabPage = dynamic(
  () => import('pages/PersonalArea/[mode]/[tab]/TabPage'),
  { ssr: false }
)
const TabIndexPage = (props) => {
  return (<TabPage {...props}/>)
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default TabIndexPage
