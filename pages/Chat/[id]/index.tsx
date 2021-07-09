
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRootState } from "types";
import {getAuthServerSide} from 'utils/auth'

import { useSelector, useDispatch } from 'react-redux'
import {wrapper} from 'store'
import request from 'utils/request'
import queryString from 'query-string'
const PersonalAreaPageIndex = (props) => {
  const router = useRouter()
  const { mode } = router.query

  return (
    <>


    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const authRes = await getAuthServerSide({redirect: true})(ctx as any);
  const profile = (authRes as any).props.profile;
  const res = await request({url: `/api/chat/${ctx.query.id}`, method: 'GET'}, ctx);


  if(res.err){
    return {
      notFound: true
    }
  }
  const chat = res.data;
  const otherProfileId = chat.profileId === profile.id ? chat.participantId : chat.profileId;
  if(chat.eventId){

  }else if(chat.taskId){

  }else{
     ctx.res.writeHead(302, { Location: `/Chat/dialog/${otherProfileId}` });
  }
  ctx.res.end();

});
export default PersonalAreaPageIndex
