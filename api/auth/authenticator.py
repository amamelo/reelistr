import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountIn, AccountOut

class AccountAuthenticator(Authenticator):
    async def get_account_data(
            self,
            username: str,
            accounts: AccountRepo
    ):
        return accounts.get(username)
    def get_all_accounts(
            self,
            accounts: AccountRepo = Depends(),
    ):
        return accounts
    def get_hashed_password(
            self,
            account: AccountIn
    ):
        return account.hashed_password
    def get_account_data_for_cookie(
            self,
            account: AccountIn):
        return account.username, AccountOut(**account.dict())


authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])
