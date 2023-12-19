#!/bin/bash

VERSION="0.1.0"

display_version() {
  echo "internsctl version $VERSION"
}

get_cpu_info() {
  echo "CPU Information:"
  lscpu
}

get_memory_info() {
  echo "Memory Information:"
  free -h
}

list_users() {
  if [[ "$1" == "--sudo-only" ]]; then
    echo "Users with sudo privileges:"
    grep -Po '^sudo.+:\K.*$' /etc/group | tr ',' '\n'
  else
    echo "All users:"
    getent passwd | cut -d: -f1
  fi
}

create_user() {
  read -p "Enter username to create: " username
  sudo adduser "$username"
}

get_file_info() {
  local size=""
  local permission=""
  local owner=""
  
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -s | --size)
        size="Size: $(du -h "$2" | cut -f1)"
        shift
        ;;
      -p | --permission)
        permission="Permissions: $(stat -c "%A" "$2")"
        ;;
      -o | --owner)
        owner="Owner: $(stat -c "%U" "$2")"
        ;;
      *)
        echo "Invalid option: $1"
        ;;
    esac
    shift
  done

  echo "File Information:"
  echo "$size"
  echo "$permission"
  echo "$owner"
}

case "$1" in
  "--version")
    display_version
    ;;
  "cpu")
    case "$2" in
      "getinfo")
        get_cpu_info
        ;;
      *)
        echo "Usage: $0 cpu getinfo"
        ;;
    esac
    ;;
  "memory")
    case "$2" in
      "getinfo")
        get_memory_info
        ;;
      *)
        echo "Usage: $0 memory getinfo"
        ;;
    esac
    ;;
  "user")
    case "$2" in
      "list")
        list_users "$3"
        ;;
      "create")
        create_user
        ;;
      *)
        echo "Usage: $0 user [list [--sudo-only] | create]"
        ;;
    esac
    ;;
  "file")
    case "$2" in
      "getinfo")
        shift 2
        get_file_info "$@"
        ;;
      *)
        echo "Usage: $0 file getinfo [options]"
        echo "Options:"
        echo "  -s, --size     Display file size"
        echo "  -p, --permission Display file permissions"
        echo "  -o, --owner    Display file owner"
        ;;
    esac
    ;;
  *)
    echo "Usage: $0 [--version | cpu getinfo | memory getinfo | user [list [--sudo-only] | create] | file getinfo [options]]"
    ;;
esac
