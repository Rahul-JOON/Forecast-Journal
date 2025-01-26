from db.data_crud import insert_data, last_insert_id


def log_api_interaction(request_url, request_method,
                        response_status, error_message) -> None:
    """
    Log API interaction details.

    Parameters:
        - request_url: The URL of the API endpoint.
        - request_method: The method used to make the request.
        - response_status: The status of the response.
        - error_message: The error message if the response status is not 200.
    """
    log_data = (("""(request_url, request_method,
                 response_status, error_message, populate_id)"""),
                (request_url, request_method,
                 response_status, error_message,
                 last_insert_id("populate_logs", "populate_id")))

    insert_data("api_logs", log_data)


def log_db_transaction(operation_type, status, error_message):
    """
    Log Temperature Prediction database transaction details.

    Parameters:
        - operation_type: The type of operation performed on the database.
        - status: The status of the operation.
        - error_message: The error message if the operation failed.
    """
    """
        Location db transactions are not logged for less complexity
        and space constraints.
        Each table will require a separate log table.
        Or
        A common log table will need to have something called as
        PolyMorphic Relationships.
        To avoid this, only the temperature_predictions table is logged.
    """
    log_data = (("""(operation_type, status, error_message,
                 populate_id, id)"""),
                (operation_type, status, error_message,
                 last_insert_id("populate_logs", "populate_id"),
                 last_insert_id("temperature_predictions", "id")
                 ))

    insert_data("db_transaction_logs", log_data)
