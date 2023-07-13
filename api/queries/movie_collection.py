from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message:str

class CollectionIn(BaseModel):
    username: str
    collection_name: str

class CollectionOut(BaseModel):
    id: int
    username: str
    collection_name: str

class CollectionRespository:
    def create(self, collection: CollectionIn) -> CollectionOut:
        with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO movie_collection
                        (username,
                        collection_name)
                        VALUES
                        (%s,%s)
                        RETURNING id, username, collection_name
                        """,
                        [
                        collection.username,
                        collection.collection_name
                        ]
                    )
                    coll = result.fetchone()
                    collection = CollectionOut(
                        id = coll[0],
                        username = coll[1],
                        collection_name = coll[2]
                    )
                    return collection

    def update(self, collection_id:int, collection: CollectionIn) -> CollectionOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE movie_collection
                        SET
                        collection_name = %s,
                        WHERE id = %s,
                        """,
                        [
                        collection.collection_name,
                        collection_id
                        ]
                    )
                    coll = result.fetchone()
                    collection = CollectionOut(
                        id = coll[0],
                        collection_name = [1]
                    )
                    return collection
        except Exception as e:
            return {'message':'could not update collection'}

    def get_one(self, username:str) -> Optional[CollectionOut]:

            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        collection_name
                        FROM movie_collection
                        where username = %s
                        """,
                        [username]
                    )
                    coll = result.fetchone()
                    collection = CollectionOut(
                        id = coll[0],
                        username = coll[1],
                        collection_name = [2]
                    )
                    return collection

    def get_all(self, username:str) -> Optional[CollectionOut]:

            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        username,
                        collection_name
                        FROM movie_collection
                        """,
                    )
                    collections = []
                    for coll in result:
                        collection = CollectionOut(
                            id=coll[0],
                            usernae=coll[1],
                            collection_name=coll[2],
                    )
                    collections.append(collection)
                    return collections

    def delete(self, collection_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM movie_collection
                        WHERE collection_name = %s;
                        """,
                        [collection_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
