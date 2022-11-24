import { ProfileRole } from "data/intefaces/IProfile";

export const getProfileRoleByRoute = (route: string) => {
  if(route.includes('MasterProfile')){
    return 'master'
  }else if(route.includes('VolunteerProfile')){
    return 'volunteer'
  }
  return null;
}

export const getImage = (role: ProfileRole) => {
  switch(role){
    case ProfileRole.Master:
      return '/img/Registration/new/user/ModeField/master.png'
    case ProfileRole.Volunteer:
      return '/img/Registration/new/user/ModeField/volunteer.png'
    case ProfileRole.Client:
      return '/img/Registration/new/user/ModeField/client.png'
  }
}
