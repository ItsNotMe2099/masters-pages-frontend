import TabPage from "pages/PersonalArea/[mode]/[tab]/TabPage";
import { withRestrictAuthSync } from "utils/auth";

const TabSubPage = (props) => {
  return (<TabPage/>)
}

export default withRestrictAuthSync(TabSubPage)
