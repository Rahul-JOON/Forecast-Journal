from db.conn import ConnectionPool

"""
Create a connection pool
The default database is the trial database i.e. DB=0
To use the development or main database, change the value of DB;
DB=1 dev_database and DB=2 main database.
"""
cpool = ConnectionPool(DB=1)


def row_existence_check(table_name, column_name, value) -> bool:
    """
    Checks if a row with the specified value exists in the specified column.

    Parameters:
        table_name (str): The name of the table.
        column_name (str): The name of the column.
        value (str): The value to be checked.
    """
    try:
        # Get a connection and cursor object
        conn, cur = cpool.get_connection()

        # Create the query
        query = f"SELECT * FROM {table_name} WHERE {column_name} = '{value}';"
        cur.execute(query)

        # Get the result
        result = cur.fetchone()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return True if result else False


def get_value_single_where(
        table_name, get_for_column,
        get_against_value, get_against_column
        ) -> any:
    """
    Returns the value of the specified column where the value of the specified
    column is equal to the specified value.

    Parameters:
        table_name (str): The name of the table.
        get_for_column (str): The column whose value is to be returned.
        get_against_value (str): The value to be checked against.
        get_against_column (str): The column to be checked against.
    """
    try:
        # Get a connection and cursor object
        conn, cur = cpool.get_connection()

        # Create the query
        query = f"""SELECT {get_for_column} FROM {table_name} WHERE
        {get_against_column}='{get_against_value}';"""
        cur.execute(query)

        # Get the result
        result = cur.fetchall()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return result[0] if result else None


def get_value_double_where_with_between(
        table_name, get_for_column, get_against_value,
        get_against_column, start_date, end_date, between_column
        ) -> any:
    """
    Returns the value of the specified column where the value of the specified
    column is equal to the specified value.

    Parameters:
        table_name (str): The name of the table.
        get_for_column (str): The column whose value is to be returned.
        get_against_value (str): The value to be checked against.
        get_against_column (str): The column to be checked against.
        start_date (str): The start date of the data range.
        end_date (str): The end date of the data range.
        between_column (str): The column to be checked against.
    """
    try:
        # Get a connection and cursor object
        conn, cur = cpool.get_connection()

        # Create the query
        query = f"""SELECT {get_for_column} FROM {table_name} WHERE
        {get_against_column}='{get_against_value}' AND
        {between_column} BETWEEN '{start_date}' AND '{end_date}';"""

        cur.execute(query)

        # Get the result
        result = cur.fetchall()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return result if result else None
