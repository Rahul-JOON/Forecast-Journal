from conn import ConnectionPool

# Create a connection pool
cpool = ConnectionPool()


def insert_data(table_name, data):
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
