enum ActionTypes {
  CREATE_PROFILE = 'Profile/CREATE',
  CHANGE_EMAIL = 'Profile/CHANGE_EMAIL',
  UPDATE_PROFILE = 'Profile/UPDATE',

  UPDATE_PROFILE_BY_FORM = 'Profile/UPDATE_PROFILE_BY_FORM',

  UPDATE_PROFILE_AVATAR = 'Profile/UPDATE_PROFILE_AVATAR',
  FETCH_PROFILE = 'Profile/FETCH_ONE',
  CHANGE_ROLE = 'Profile/CHANGE_ROLE',
  CHANGE_ROLE_NATIVE = 'Profile/CHANGE_ROLE_NATIVE',
  CHANGE_ROLE_SUCCESS = 'Profile/CHANGE_ROLE_SUCCESS',

  SHOW_FORM = 'Profile/SHOW_FORM',
  HIDE_FORM = 'Profile/HIDE_FORM',

  SET_CURRENT_SKILL = 'Profile/SET_CURRENT_SKILL',

  DELETE_PROFILE = 'Profile/DELETE_PROFILE',
  DELETE_PROFILE_REQUEST = 'Profile/DELETE_PROFILE_REQUEST',

  FORM_RESET = 'Profile/FORM_RESET',
}

export default ActionTypes