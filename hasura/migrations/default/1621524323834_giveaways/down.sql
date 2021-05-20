
alter table "giveaways"."prize" alter column "owner" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "giveaways"."giveaway" add column "ended" boolean
 not null default 'false';

DROP TABLE "giveaways"."participants";

DROP TABLE "giveaways"."prize";

alter table "giveaways"."giveaway" alter column "winners" drop not null;
alter table "giveaways"."giveaway" add column "winners" jsonb;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "giveaways"."giveaway" add column "winners" jsonb
 null;

DROP TABLE "giveaways"."giveaway";

drop schema "giveaways" cascade;
