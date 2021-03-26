import NewMain from 'pages/NewMain'
import {getAuthServerSide} from 'utils/auth'
import {wrapper} from 'store'
import request from 'utils/request'

const Home = (props) => {
  return (<NewMain {...props}/>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const res = await getAuthServerSide()(ctx as any);
  if((res as any).props.user){
    ctx.res.writeHead(302, { Location: "/PersonalArea" });
    ctx.res.end();
    return;
  }

});
export default Home
