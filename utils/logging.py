from db.data_crud import insert_data, last_insert_id


def log_api_interaction(request_url, request_method,
                        response_status, error_message) -> None:
    """
    Log API interaction details
    """
    log_data = (("""(request_url, request_method,
                 response_status, error_message, populate_id)"""),
                (request_url, request_method,
                 response_status, error_message,
                 last_insert_id("populate_logs", "populate_id")))

    insert_data("api_logs", log_data)


def log_db_transaction(operation_type, table_name, status, error_message):
    """
    Log DB transaction details
    """
    log_data = (("""(operation_type, table_name, status, error_message,
                 populate_id, id)"""),
                (operation_type, table_name, status, error_message,
                 last_insert_id("populate_logs", "populate_id"),
                 last_insert_id("temperature_predictions", "id")
                 ))

    insert_data("db_logs", log_data)
