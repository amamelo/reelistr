from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class CollectionIn(BaseModel):
    collection_name: str


class CollectionOut(BaseModel):
    collection_id: int
    username: str
    collection_name: str


class CollectionRespository:
    def create_collection(self, collection: CollectionIn, username: str) -> CollectionOut: # noqa
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO movie_collection
                    (username,collection_name)
                    VALUES
                    (%s,%s)
                    RETURNING id, username, collection_name
                    """,
                    [
                        username,
                        collection.collection_name,
                    ]
                )
                coll = result.fetchone()
                collection = CollectionOut(
                    collection_id=coll[0],
                    username=coll[1],
                    collection_name=coll[2]
                )
                return collection

    def update_collection(self, collection_id: int, collection: CollectionIn) -> CollectionOut: # noqa
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE movie_collection
                        SET
                        collection_name = %s
                        WHERE id = %s
                        RETURNING id, username, collection_name
                        """,
                        [
                            collection.collection_name,
                            collection_id,
                        ]
                    )
                    coll = result.fetchone()
                    collection = CollectionOut(
                        collection_id=coll[0],
                        username=coll[1],
                        collection_name=coll[2]
                    )
                    return collection
        except Exception:
            return {'message': 'could not update collection'}

    def get_one_collection(self, collection_id: int) -> Optional[CollectionOut]: # noqa
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    id,
                    username,
                    collection_name
                    FROM movie_collection
                    where id= %s
                    """,
                    [collection_id]
                )
                coll = result.fetchone()
                collection = CollectionOut(
                    collection_id=coll[0],
                    username=coll[1],
                    collection_name=coll[2]
                )
                return collection

    def get_all_collections(self, username: str) -> Optional[CollectionOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    *
                    FROM movie_collection
                    WHERE username = %s
                    """,
                    [username]
                )
                collections = []
                for coll in result:
                    collection = CollectionOut(
                        collection_id=coll[0],
                        username=coll[1],
                        collection_name=coll[2],
                    )
                    collections.append(collection)
                return collections

    def delete_collection(self, collection_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM movie_collection
                        WHERE id = %s;
                        """,
                        [collection_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
