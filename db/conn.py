import os
from psycopg2 import pool
from dotenv import load_dotenv

# Load .env file to get the connection string
load_dotenv()
trial_db, dev_db = os.getenv('DATABASE_URL_TRIAL'), os.getenv(
    'DATABASE_URL_DEVELOPMENT')


class ConnectionPool:
    """
    A class to manage the connection pool to the PostgreSQL database.

    Methods:
        - get_connection(none) -> returns a connection and cursor
        object (conn, cur).
        - close_connection(conn, cur) -> closes the connection and returns
        it to the pool.
        - close_all_connections(none) -> closes all connections in the pool.
    """

    def __init__(self, DB=0, min_conn=1,
                 max_conn=10) -> None:
        """
        Initializes the connection pool with the given connection string,
        minimum and maximum number of connections.
        """
        connection_string = trial_db if DB == 0 else dev_db
        self.connection_pool = pool.SimpleConnectionPool(
            min_conn,  # Minimum number of connections in the pool
            max_conn,  # Maximum number of connections in the pool
            connection_string
        )

    def get_connection(self) -> tuple:
        """
        Returns a connection and cursor object from the connection pool.

        Parameters:
            none
        """
        conn = self.connection_pool.getconn()
        cur = conn.cursor()
        return conn, cur

    def close_connection(self, conn, cur) -> None:
        """
        Closes the connection and returns it to the pool.

        Parameters:
            conn (connection): A connection object to be closed.
            cur (cursor): A cursor object to be closed.
        """
        cur.close()
        self.connection_pool.putconn(conn)

    def close_all_connections(self) -> None:
        """
        Closes all connections in the pool.

        Parameters:
            none
        """
        self.connection_pool.closeall()
