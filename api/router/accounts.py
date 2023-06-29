from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request
)
from jwtdown_fastapi.authentication import Token
from auth import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError
)


class AccountForm(BaseModel):
    username: str
    email: str
    password: str
    password_confirm: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
