import {IProfile} from "data/intefaces/IProfile";

export default class Routes{
  static profile(profile: IProfile){
    return  profile?.slug ? `/${profile.slug}` : `/id${profile?.id}`
  }
  static get  organizationMain(){
    return `/organization`
  }
}
