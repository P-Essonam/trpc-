CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL
);
