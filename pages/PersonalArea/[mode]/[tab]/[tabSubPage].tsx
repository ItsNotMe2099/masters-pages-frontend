import TabPage from "pages/PersonalArea/[mode]/[tab]/TabPage";
import {getAuthServerSide} from "utils/auth";

const TabSubPage = (props) => {
  return (<TabPage {...props}/>)
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default TabSubPage
