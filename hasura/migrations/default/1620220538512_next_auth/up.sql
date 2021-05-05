
CREATE TABLE "public"."users" ("id" serial NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "email_verified" timestamptz NOT NULL, "image" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."sessions" ("id" serial NOT NULL, "user_id" integer NOT NULL, "expires" timestamptz NOT NULL, "session_token" text NOT NULL, "access_token" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_sessions_updated_at"
BEFORE UPDATE ON "public"."sessions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_sessions_updated_at" ON "public"."sessions" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."verification_requests" ("id" serial NOT NULL, "identifier" text NOT NULL, "token" text NOT NULL, "expires" timestamptz NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_verification_requests_updated_at"
BEFORE UPDATE ON "public"."verification_requests"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_verification_requests_updated_at" ON "public"."verification_requests" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."accounts" ("id" serial NOT NULL, "compound_id" text NOT NULL, "user_id" integer NOT NULL, "provider_type" text NOT NULL, "provider_id" text NOT NULL, "provider_account_id" text NOT NULL, "refresh_token" text NOT NULL, "access_token" text NOT NULL, "access_token_expires" timestamptz NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_accounts_updated_at"
BEFORE UPDATE ON "public"."accounts"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_accounts_updated_at" ON "public"."accounts" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "public"."users" alter column "image" drop not null;

alter table "public"."users" alter column "email_verified" drop not null;

alter table "public"."accounts" alter column "refresh_token" drop not null;

alter table "public"."accounts" alter column "access_token" drop not null;

alter table "public"."accounts" alter column "access_token_expires" drop not null;
