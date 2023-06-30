# from jsonb.objectid import ObjectId
from pydantic import BaseModel
from typing import List


# class PydanticObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate

#     @classmethod
#     def validate(cls, value: ObjectId | str) -> ObjectId:
#         if value:
#             try:
#                 ObjectId(value)
#             except:
#                 raise ValueError(f"Not a valid object id: {value}")
#         return value


class SessionOut(BaseModel):
    jti: str
    account_id: str


class UserIn(BaseModel):
    email: str
    password: str
    username: str


class User(UserIn):
    # id: PydanticObjectId
    roles: List[str]


class UserOut(BaseModel):
    id: str
    email: str
    username: str
    roles: List[str]
