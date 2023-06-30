from pydantic import BaseModel


class DuplicateAccountError(BaseModel):
    message: str


class UserIn(BaseModel):
    email: str
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    username: str


class AccountOutWithPassword(UserOut):
    hashed_password: str


class UserRepo(BaseModel):
    def user_record_to_dict(self, row, description):
        user = None
        if row is not None:
            user = {}
            user_fields = [
                'id',
                'email',
                'username',
                'hashed_password'
            ]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
        return AccountOutWithPassword

    def get_users(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                    """
                )
