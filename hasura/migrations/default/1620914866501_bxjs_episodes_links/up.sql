
create schema "bxjsweekly";

CREATE TABLE "bxjsweekly"."links" ("id" serial NOT NULL, "category" text NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "episode" integer NOT NULL, PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "bxjsweekly"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_bxjsweekly_links_updated_at"
BEFORE UPDATE ON "bxjsweekly"."links"
FOR EACH ROW
EXECUTE PROCEDURE "bxjsweekly"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_bxjsweekly_links_updated_at" ON "bxjsweekly"."links" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "bxjsweekly"."episodes" ("id" serial NOT NULL, "name" text NOT NULL, "date" timestamptz NOT NULL DEFAULT now(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "bxjsweekly"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_bxjsweekly_episodes_updated_at"
BEFORE UPDATE ON "bxjsweekly"."episodes"
FOR EACH ROW
EXECUTE PROCEDURE "bxjsweekly"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_bxjsweekly_episodes_updated_at" ON "bxjsweekly"."episodes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "bxjsweekly"."links"
  add constraint "links_episode_fkey"
  foreign key ("episode")
  references "bxjsweekly"."episodes"
  ("id") on update restrict on delete restrict;
