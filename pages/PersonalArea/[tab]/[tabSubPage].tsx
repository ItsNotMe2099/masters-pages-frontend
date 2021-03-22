import {getAuthServerSide} from "utils/auth";
import dynamic from "next/dynamic";
const TabPage = dynamic(
  () => import('pages/PersonalArea/[tab]/TabPage'),
  { ssr: false }
)
const TabSubPage = (props) => {
  return (<TabPage {...props}/>)
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default TabSubPage
