import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut, AccountOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepo,
    ):
        return accounts.get_account(username)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def try_get_account_data_for_cookie(self, account: AccountOutWithPassword):
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
