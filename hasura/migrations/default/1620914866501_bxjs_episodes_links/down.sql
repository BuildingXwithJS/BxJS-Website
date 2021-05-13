
alter table "bxjsweekly"."links" drop constraint "links_episode_fkey";

DROP TABLE "bxjsweekly"."episodes";

DROP TABLE "bxjsweekly"."links";

drop schema "bxjsweekly" cascade;
