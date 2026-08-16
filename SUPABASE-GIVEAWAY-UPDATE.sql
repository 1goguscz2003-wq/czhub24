
create or replace function public.czhub24_dashboard(days_back integer default 30)
returns jsonb
language sql
security definer
set search_path = public
as $$
with filtered as (
  select created_at, data
  from public.analytics_events
  where days_back = 0 or created_at >= now() - make_interval(days => days_back)
),
summary as (
  select
    count(*) as events,
    count(distinct data->>'sessionId') filter (where data->>'sessionId' is not null) as sessions,
    count(*) filter (where data->>'type' = 'platform_click') as outbound,
    count(distinct data->>'sessionId') filter (
      where data->>'type' = 'platform_click' and data->>'sessionId' is not null
    ) as reached,
    count(*) filter (where data->>'type' like '%giveaway%') as giveaway
  from filtered
),
giveaway_summary as (
  select
    count(*) filter (
      where days_back = 0 or created_at >= now() - make_interval(days => days_back)
    ) as registered,
    count(*) filter (
      where qualified = true
      and (days_back = 0 or created_at >= now() - make_interval(days => days_back))
    ) as qualified
  from public.giveaway_users
),
cities as (
 select coalesce(jsonb_agg(jsonb_build_object('name',name,'count',total) order by total desc),'[]'::jsonb) value
 from (select data->>'city' name,count(*) total from filtered where data->>'type'='city_select' and data->>'city' is not null group by data->>'city') x
),
categories as (
 select coalesce(jsonb_agg(jsonb_build_object('name',name,'count',total) order by total desc),'[]'::jsonb) value
 from (select data->>'category' name,count(*) total from filtered where data->>'type'='category_select' and data->>'category' is not null group by data->>'category') x
),
platforms as (
 select coalesce(jsonb_agg(jsonb_build_object('name',name,'count',total) order by total desc),'[]'::jsonb) value
 from (select data->>'platform' name,count(*) total from filtered where data->>'type'='platform_click' and data->>'platform' is not null group by data->>'platform') x
),
sources as (
 select coalesce(jsonb_agg(jsonb_build_object('name',name,'count',total) order by total desc),'[]'::jsonb) value
 from (select coalesce(nullif(data->>'source',''),'direct') name,count(distinct data->>'sessionId') total from filtered where data->>'type'='page_view' group by coalesce(nullif(data->>'source',''),'direct')) x
),
combinations as (
 select coalesce(jsonb_agg(jsonb_build_object('city',city,'category',category,'count',total) order by total desc),'[]'::jsonb) value
 from (select data->>'city' city,data->>'category' category,count(*) total from filtered where data->>'type'='category_select' and data->>'city' is not null and data->>'category' is not null group by data->>'city',data->>'category' order by total desc limit 50) x
)
select jsonb_build_object(
 'events',summary.events,
 'sessions',summary.sessions,
 'reached',summary.reached,
 'outbound',summary.outbound,
 'giveaway',summary.giveaway,
 'giveaway_registered',giveaway_summary.registered,
 'giveaway_qualified',giveaway_summary.qualified,
 'conversion',case when summary.sessions=0 then 0 else round((summary.reached::numeric/summary.sessions::numeric)*100,1) end,
 'cities',cities.value,'categories',categories.value,'platforms',platforms.value,'sources',sources.value,'combinations',combinations.value
)
from summary,giveaway_summary,cities,categories,platforms,sources,combinations;
$$;

revoke all on function public.czhub24_dashboard(integer) from public;
grant execute on function public.czhub24_dashboard(integer) to authenticated;
