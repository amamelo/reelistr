from typing import Optional
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from routers.authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountRepo,
    AccountOutWithPassword
)
from psycopg.errors import UniqueViolation
from queries.watchlist import MovieWatchlistRepo


class AccountForm(BaseModel):
    email: str
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut
    watchlist_id: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
    watchlist_repo: MovieWatchlistRepo = Depends()
):
    print("repo:", repo)
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)

        watchlist = watchlist_repo.create_watchlist(account.username)
    except UniqueViolation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(
        email=info.email,
        username=info.username,
        password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(
        account=account,
        watchlist_id=watchlist.id,
        **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    repo: MovieWatchlistRepo = Depends(),
    account: AccountOutWithPassword = Depends(
        authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        watchlist = repo.get_watchlist_by_username(account["username"])
        print(account)
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
            "watchlist_id": watchlist.id
        }


@router.get("/api/accounts/{username}", response_model=AccountOut)
async def get_account(
    username: str,
    repo: AccountRepo = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
):
    return repo.get_account(username)


@router.get("/api/accounts")
async def get_all_accounts(
    repo: AccountRepo = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
):
    return repo.get_all_accounts()


@router.put("/api/accounts/{username}", response_model=AccountOut)
async def update_account(
    username: str,
    account: AccountIn,
    repo: AccountRepo = Depends(),
    # account_data: dict = Depends(authenticator.try_get_current_account_data)
):

    hashed_password = authenticator.hash_password(account.password)
    AccountForm(
        email=account.email,
        username=account.username,
        password=account.password)
    return repo.update(username, account, hashed_password)


@router.delete('/api/accounts/{username}', response_model=bool)
def delete_account(
    username: str,
    repo: AccountRepo = Depends(),
) -> bool:
    return repo.delete(username)
