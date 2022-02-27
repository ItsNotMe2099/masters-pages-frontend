
export const getProfileRoleByRoute = (route: string) => {
  if(route.includes('MasterProfile')){
    return 'master'
  }else if(route.includes('VolunteerProfile')){
    return 'volunteer'
  }
  return null;
}
