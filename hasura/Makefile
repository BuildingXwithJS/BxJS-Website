console:
	npx hasura-cli console --admin-secret "localadminsecret" --no-browser

restore-migrations:
	npx hasura-cli migrate apply --admin-secret "localadminsecret" --database-name default

restore-metadata:
	npx hasura-cli metadata apply --admin-secret "localadminsecret"

restore: restore-migrations restore-metadata
