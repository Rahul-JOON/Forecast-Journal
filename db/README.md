# Database (DB) Folder

The `db` folder contains modules that handle database connections and CRUD operations for the PostgreSQL database used in the Forecast Journal project.

---

## Files and Classes

### 1. `conn.py`

This file manages the connection pool for efficient interaction with the PostgreSQL database.

#### Class: `ConnectionPool`
- **Purpose**:
  - Manages a pool of connections to the database to optimize resource usage and improve performance.
  
---

### 2. `data_crud.py`

This file contains functions for performing CRUD (Create, Read, Update, Delete) operations on the database.

#### Functions

- **`insert_data`**

- **`row_existence_check`**
  
- **`get_value_single_where`**

- **`last_insert_id`**

- **`update_row_single_where`**
  
---

## Usage
1. Ensure the database connection parameters are correctly set in the environment or configuration files.
2. Use `ConnectionPool` for managing connections efficiently.
3. Leverage the CRUD functions in `data_crud.py` for interacting with the database.

---

## Notes
- Always ensure proper error handling when dealing with database operations.
- Close connections when they are no longer needed to prevent resource leaks.
