from api.key_processor import (load_location_keys, store_location_keys,
                               get_location_keys)


def update_keys(locations) -> None:
    """Updates the location keys for the given locations.

    Parameters:
        locations (list): A list of location names.
        e.g. ["Dwarka", "Najafgarh", "Nawada", "Bahadurgarh"]
    """

    location_keys = get_location_keys(locations)

    store_location_keys(location_keys)

    print("Location keys updated.")


# Load the location keys from the binary file and print them
loaded_keys = load_location_keys()
print("Already existing keys: ", loaded_keys)
