from db.conn import ConnectionPool

"""
Create a connection pool
The default database is the trial database i.e. DB=0
To use the development or main database, change the value of DB;
DB=1 dev_database and DB=2 main database.
"""
cpool = ConnectionPool()


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


def get_location_id(location_name) -> int:
    """
    Returns the location id for the given location name.

    Parameters:
        location_name (str): The name of the location.
    """
    try:
        # Get a connection and cursor object
        conn, cur = cpool.get_connection()

        # Create the query
        query = f"""SELECT location_id FROM locations WHERE
        location_name = '{location_name}';"""
        cur.execute(query)

        # Get the result
        result = cur.fetchone()

        # close the connection
        cpool.close_connection(conn, cur)

    except Exception as e:
        print(e)
        return False
    return result[0] if result else None
