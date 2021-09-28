#!/bin/sh
set -e

host="$1"

until PGPASSWORD="postgres" psql -h "$host" -d "postgres" -U "postgres" -c '\q';
do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done