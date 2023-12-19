# internsctl

`internsctl` is a custom Linux command designed to provide various system information and perform specific tasks conveniently through the command line.

## Features

- Display system-wide information about CPU, memory, users, and files.
- Create new users on the system.
- Retrieve specific information about files such as size, permissions, and owner.

## Usage

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your_username/internsctl.git
    ```

2. Make the script executable:

    ```bash
    chmod +x internsctl.sh
    ```

3. Update the `mandb` for manual page indexing:

    ```bash
    sudo mv internsctl.1 /usr/share/man/man1/
    sudo mandb
    ```

### Command Structure

The `internsctl` command follows the structure below:

```plaintext
internsctl [--version | cpu getinfo | memory getinfo | user [list [--sudo-only] | create] | file getinfo [options]]
```
### Options for file getinfo
-s, --size: Display the size of the file.
-p, --permission: Display the permissions of the file.
-o, --owner: Display the owner of the file.