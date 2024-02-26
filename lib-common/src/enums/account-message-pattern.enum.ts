export enum AccountMessagePatterns {
  ACCOUNT_findAdminUserById = 'ACCOUNT_findAdminUserById',
  ACCOUNT_findAdminUserByUsername = 'ACCOUNT_findAdminUserByUsername',
  ACCOUNT_findAdminUserByEmail = 'ACCOUNT_findAdminUserByEmail',
  ACCOUNT_findAdminUserListByFilters = 'ACCOUNT_findAdminUserListByFilters',
  ACCOUNT_findAdminUserDetailById = 'ACCOUNT_findAdminUserDetailById',
  ACCOUNT_findAdminUserPasswordHashById = 'ACCOUNT_findAdminUserPasswordHashById',
  ACCOUNT_createAdminUser = 'ACCOUNT_createAdminUser',
  ACCOUNT_editAdminUser = 'ACCOUNT_editAdminUser',
  ACCOUNT_createAdminUserRole = 'ACCOUNT_createAdminUserRole',
  ACCOUNT_findAdminUserInfoById = 'ACCOUNT_findAdminUserInfoById',
  ACCOUNT_signUpPlayerUser = 'ACCOUNT_signUpPlayerUser',
  ACCOUNT_findPlayerUserById = 'ACCOUNT_findPlayerUserById',
  ACCOUNT_findPlayerUserByUsername = 'ACCOUNT_findPlayerUserByUsername',
  ACCOUNT_findPlayerUserByEmail = 'ACCOUNT_findPlayerUserByEmail',
  ACCOUNT_findPlayerUserPasswordHashById = 'ACCOUNT_findPlayerUserPasswordHashById',
  ACCOUNT_findPlayerUserProfileById = 'ACCOUNT_findPlayerUserProfileById',
  ACCOUNT_createClientRegister = 'ACCOUNT_createClientRegister',
  ACCOUNT_editClientRegisterToken = 'ACCOUNT_editClientRegisterToken',
  ACCOUNT_adminUserGoogleLogin = 'ACCOUNT_adminUserGoogleLogin',
  ACCOUNT_adminUserLogin = 'ACCOUNT_adminUserLogin',
  ACCOUNT_adminUserRefreshToken = 'ACCOUNT_adminUserRefreshToken',
  ACCOUNT_playerUserGoogleLogin = 'ACCOUNT_playerUserGoogleLogin',
  SYSTEM_findPermissionList = 'SYSTEM_findPermissionList',
  SYSTEM_findMenuList = 'SYSTEM_findMenuList',
  SYSTEM_saveRole = 'SYSTEM_saveRole',
  SYSTEM_findRole = 'SYSTEM_findRole',
  SYSTEM_findRoleList = 'SYSTEM_findRoleList',
  SYSTEM_editRole = 'SYSTEM_editRole',
  SYSTEM_deleteRole = 'SYSTEM_deleteRole',
}