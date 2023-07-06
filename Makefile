run-db:
	docker run --name reelistr -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=reelistr -v ${PWD}/db_data:/var/lib/postgresql/data -d postgres
