
create schema "giveaways";

CREATE TABLE "giveaways"."giveaway" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "ends_at" date NOT NULL, PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "giveaways"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_giveaways_giveaway_updated_at"
BEFORE UPDATE ON "giveaways"."giveaway"
FOR EACH ROW
EXECUTE PROCEDURE "giveaways"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_giveaways_giveaway_updated_at" ON "giveaways"."giveaway" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "giveaways"."giveaway" add column "winners" jsonb
 null;

alter table "giveaways"."giveaway" drop column "winners" cascade;

CREATE TABLE "giveaways"."prize" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text NOT NULL, "giveaway" integer NOT NULL, "owner" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("giveaway") REFERENCES "giveaways"."giveaway"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "giveaways"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_giveaways_prize_updated_at"
BEFORE UPDATE ON "giveaways"."prize"
FOR EACH ROW
EXECUTE PROCEDURE "giveaways"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_giveaways_prize_updated_at" ON "giveaways"."prize" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "giveaways"."participants" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "giveaway" integer NOT NULL, "user" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("giveaway") REFERENCES "giveaways"."giveaway"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "giveaways"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_giveaways_participants_updated_at"
BEFORE UPDATE ON "giveaways"."participants"
FOR EACH ROW
EXECUTE PROCEDURE "giveaways"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_giveaways_participants_updated_at" ON "giveaways"."participants" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "giveaways"."giveaway" add column "ended" boolean
 not null default 'false';

alter table "giveaways"."prize" alter column "owner" drop not null;
