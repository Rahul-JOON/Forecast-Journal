from db.conn import ConnectionPool

"""
Create a connection pool
The default database is the trial database i.e. DB=0
To use the development or main database, change the value of DB;
DB=1 dev_database and DB=2 main database.
"""
cpool = ConnectionPool(DB=5)


def insert_data(table_name, data) -> bool:
    """
    Inserts data into the specified table.

    Parameters:
        table_name (str): The name of the table.
        data (tuple): A tuple containing the column names and the data to be
        inserted.
        e.g. table_name = "locations"
             data = (("(location_id, location_name, unique_key)"),
                        (1, "Bangalore", "BLR"),
                        (2, "Hyderabad", "HYD"))
    P.S. The first element of the data tuple should be the column names in
    parentheses. Hence, data is a tuple of tuples among which the first tuple
    is a string containing the column names and the rest of the tuples are the
    data to be inserted.
    """
    try:
        # Get a connection and cursor object
        conn, cur = cpool.get_connection()

        # Get the column names
        cols = data[0]

        # Create the query
        query = f"INSERT INTO {table_name} {cols} VALUES "
        for i in range(1, len(data)):
            query += f"{data[i]}, "
        query = query[:-2]
        query += ";"
        # print(query)
        cur.execute(query)
        # save the changes
        conn.commit()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return True


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
        result = cur.fetchone()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return result[0] if result else None


def last_insert_id(table_name, col_name) -> int:
    """
    Returns the last inserted id of the specified column in the specified
    table.

    Parameters:
        table_name (str): The name of the table.
        col_name (str): The name of the column.
    """
    try:
        # Get a connection and cursor object
        conn, cur = cpool.get_connection()

        # Create the query
        query = f"SELECT last_value FROM {table_name}_{col_name}_seq;"
        cur.execute(query)

        # Get the result
        result = cur.fetchone()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return result[0] if result else None


def update_row_single_where(table_name, target_col, new_value, against_col,
                            against_value):

    # Get a connection and cursor object
    conn, cur = cpool.get_connection()

    # Create the query
    query = f"""UPDATE {table_name}
    SET {target_col} = '{new_value}'
    WHERE {against_col} = {against_value};"""

    cur.execute(query)

    # save the changes
    conn.commit()

    # close the connection
    cpool.close_connection(conn, cur)
