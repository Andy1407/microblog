#!/bin/sh
# shellcheck disable=SC2039
source venv/bin/activate
while true; do
    flask db upgrade
    # shellcheck disable=SC2181
    if [[ "$?" == "0" ]]; then
        break
    fi
    echo Upgrade command failed, retrying in 5 secs...
    sleep 5
done
flask translate compile
exec gunicorn -b :5000 --access-logfile - --error-logfile - microblog:app