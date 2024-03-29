export enum TcpServices {
  LOTTO_GAME_SERVER = 'LOTTO_GAME_SERVER',
  LOTTO_ACCOUNT_SERVER = 'LOTTO_ACCOUNT_SERVER',
}

export enum GameTcpCommands {
  GAME_findGameDetailsByGameId = 'GAME_findGameDetailsByGameId',
  GAME_editGameBaseInfo = 'GAME_editGameBaseInfo',
  GAME_editGameStatus = 'GAME_editGameStatus',
  GAME_findGameWinningRulesByGameId = 'GAME_findGameWinningRulesByGameId',
  GAME_saveGameWinningRules = 'GAME_saveGameWinningRules',
  GAME_findRoundById = 'GAME_findRoundById',
  GAME_findRoundByGameIdAndTurnNumber = 'GAME_findRoundByGameIdAndTurnNumber',
  GAME_findRoundByActive = 'GAME_findRoundByActive',
  GAME_findRoundSummaryByGameIdAndTurnNumber = 'GAME_findRoundSummaryByGameIdAndTurnNumber',
  GAME_findRoundSummaryByActive = 'GAME_findRoundSummaryByActive',
  GAME_findRoundSummaryPagination = 'GAME_findRoundSummaryPagination',
  GAME_divideRoundByCycleCode = 'GAME_divideRoundByCycleCode',
  GAME_findWinningNumberByRoundId = 'GAME_findWinningNumberByRoundId',
  GAME_createWinningNumber = 'GAME_createWinningNumber',
  GAME_forcedBatchJob = 'GAME_forcedBatchJob',
  GAME_resetRoundByCycleCode = 'GAME_resetRoundByCycleCode',
}

export enum TicketTcpCommands {
  TICKET_DETAILS_BY_ID = 'TICKET_DETAILS_BY_ID',
  TICKET_BUNDLE_DETAILS_BY_ID = 'TICKET_BUNDLE_DETAILS_BY_ID',
  TICKET_DETAIL_PAGINATION_BY_OWNER_ID = 'TICKET_DETAIL_PAGINATION_BY_OWNER_ID',
  TICKET_ISSUING_TICKET = 'TICKET_ISSUING_TICKET',
  TICKET_BUNDLE_ISSUING_TICKET = 'TICKET_BUNDLE_ISSUING_TICKET',
  TICKET_BUNDLE_ONGOING_TICKET = 'TICKET_BUNDLE_ONGOING_TICKET',
  TICKET_ADMIN_DETAILS_BY_ID = 'TICKET_ADMIN_DETAILS_BY_ID',
  TICKET_ADMIN_TOTAL_LIST = 'TICKET_ADMIN_TOTAL_LIST',
  TICKET_ADMIN_TRANSACTION_LIST = 'TICKET_ADMIN_TRANSACTION_LIST',
  TICKET_ADMIN_TRANSACTION_DETAILS = 'TICKET_ADMIN_TRANSACTION_DETAILS',
  TICKET_findWinningTicketDetailByFilterSort = 'TICKET_findWinningTicketDetailByFilterSort',
}

export enum RolePermissionTcpCommands {
  LOTTO_PERMISSION_LIST_GET = 'LOTTO_PERMISSION_LIST_GET',
  LOTTO_MENU_LIST_GET = 'LOTTO_MENU_LIST_GET',
  LOTTO_MENU_LIST_SET = 'LOTTO_MENU_LIST_SET',
  LOTTO_ROLE_SET = 'LOTTO_ROLE_SET',
  LOTTO_ROLE_GET = 'LOTTO_ROLE_GET',
  LOTTO_ROLE_ALL_LIST = 'LOTTO_ROLE_ALL_LIST',
  LOTTO_ROLE_EDIT = 'LOTTO_ROLE_EDIT',
  LOTTO_ROLE_DeleteRole = 'LOTTO_ROLE_DeleteRole',
}

export enum AccountTcpCommands {
  ACCOUNT_ADMIN_USER_BY_ID = 'ACCOUNT_ADMIN_USER_BY_ID',
  ACCOUNT_ADMIN_USER_BY_USERNAME = 'ACCOUNT_ADMIN_USER_BY_USERNAME',
  ACCOUNT_ADMIN_USER_BY_EMAIL = 'ACCOUNT_ADMIN_USER_BY_EMAIL',
  ACCOUNT_ADMIN_LIST_BY_FILTERS = 'ACCOUNT_ADMIN_LIST_BY_FILTERS',
  ACCOUNT_ADMIN_USER_DETAIL_BY_ID = 'ACCOUNT_ADMIN_USER_DETAIL_BY_ID',
  ACCOUNT_ADMIN_USER_PASSWORD_HASH_BY_ID = 'ACCOUNT_ADMIN_USER_PASSWORD_HASH_BY_ID',
  ACCOUNT_ADMIN_USER_CREATE = 'ACCOUNT_ADMIN_USER_CREATE',
  ACCOUNT_ADMIN_USER_EDIT = 'ACCOUNT_ADMIN_USER_EDIT',
  ACCOUNT_ADMIN_USER_ROLE_CREATE = 'ACCOUNT_ADMIN_USER_ROLE_CREATE',
  ACCOUNT_ADMIN_INFO_BY_ID = 'ACCOUNT_ADMIN_INFO_BY_ID',
  ACCOUNT_adminUserGoogleLogin = 'ACCOUNT_adminUserGoogleLogin',
  ACCOUNT_adminUserLogin = 'ACCOUNT_adminUserLogin',
  ACCOUNT_adminUserRefreshToken = 'ACCOUNT_adminUserRefreshToken',

  ACCOUNT_USER_SIGNUP = 'ACCOUNT_USER_SIGNUP',
  ACCOUNT_USER_BY_ID = 'ACCOUNT_USER_BY_ID',
  ACCOUNT_USER_BY_USERNAME = 'ACCOUNT_USER_BY_USERNAME',
  ACCOUNT_USER_BY_EMAIL = 'ACCOUNT_USER_BY_EMAIL',
  ACCOUNT_USER_PASSWORD_HASH_BY_ID = 'ACCOUNT_USER_PASSWORD_HASH_BY_ID',
  ACCOUNT_USER_PROFILE_BY_ID = 'ACCOUNT_USER_PROFILE_BY_ID',
  ACCOUNT_CLIENT_REGISTER_CREATE = 'ACCOUNT_CLIENT_REGISTER_CREATE',
  ACCOUNT_CLIENT_REGISTER_EDIT_TOKEN = 'ACCOUNT_CLIENT_REGISTER_EDIT_TOKEN',

  ACCOUNT_PLAYER_USER_TOTAL_LIST = 'ACCOUNT_PLAYER_USER_TOTAL_LIST',
  ACCOUNT_PLAYER_USER_DETAIL = 'ACCOUNT_PLAYER_USER_DETAIL',
  ACCOUNT_playerUserLogin = 'ACCOUNT_playerUserLogin',
  ACCOUNT_playerUserRefreshToken = 'ACCOUNT_playerUserRefreshToken',
  ACCOUNT_playerUserGoogleLogin = 'ACCOUNT_playerUserGoogleLogin',
  ACCOUNT_playerUserSignup = 'ACCOUNT_playerUserSignup',
  ACCOUNT_signUpPlayerUser = 'ACCOUNT_signUpPlayerUser',
  ACCOUNT_findPlayerUserById = 'ACCOUNT_findPlayerUserById',
  ACCOUNT_findPlayerUserByUsername = 'ACCOUNT_findPlayerUserByUsername',
  ACCOUNT_findPlayerUserByEmail = 'ACCOUNT_findPlayerUserByEmail',
  ACCOUNT_findPlayerUserPasswordHashById = 'ACCOUNT_findPlayerUserPasswordHashById',
  ACCOUNT_findPlayerUserProfileById = 'ACCOUNT_findPlayerUserProfileById',
  ACCOUNT_createClientRegister = 'ACCOUNT_createClientRegister',
  ACCOUNT_editClientRegisterToken = 'ACCOUNT_editClientRegisterToken',

  ACCOUNT_sellerUserLogin = 'ACCOUNT_sellerUserLogin',
  ACCOUNT_sellerUserRefreshToken = 'ACCOUNT_sellerUserRefreshToken',
}

export enum FinanceTcpCommands {
  FINANCE_findAssetById = 'FINANCE_findAssetById',
  FINANCE_findAssetByOwnerIdAndAssetType = 'FINANCE_findAssetByOwnerIdAndAssetType',
  FINANCE_createAsset = 'FINANCE_createAsset',

  FINANCE_findAssetTransactionById = 'FINANCE_findAssetTransactionById',
  FINANCE_findAssetTransactionPaginationByFilterSort = 'FINANCE_findAssetTransactionPaginationByFilterSort',
  FINANCE_pointDeposit = 'FINANCE_pointDeposit',
  FINANCE_buyTicket = 'FINANCE_buyTicket',

  FINANCE_requestPrizeClaimable = 'FINANCE_requestPrizeClaimable',
  FINANCE_findPrizePayoutDetailById = 'FINANCE_findPrizePayoutDetailById',
  FINANCE_findPrizePayoutDetailByFilterSort = 'FINANCE_findPrizePayoutDetailByFilterSort',
  FINANCE_confirmPayout = 'FINANCE_confirmPayout',
}
