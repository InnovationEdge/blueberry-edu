-- Prevent duplicate registrations at database level
-- (client-side check is fragile because anon role lacks SELECT on registrations)

-- Remove potential existing duplicates first (keep oldest)
delete from course_registrations a
using course_registrations b
where a.id > b.id
  and a.course_id = b.course_id
  and lower(a.email) = lower(b.email);

delete from masterclass_registrations a
using masterclass_registrations b
where a.id > b.id
  and a.masterclass_id = b.masterclass_id
  and lower(a.email) = lower(b.email);

-- Create case-insensitive unique indexes
create unique index if not exists course_registrations_unique_email
  on course_registrations (course_id, lower(email));

create unique index if not exists masterclass_registrations_unique_email
  on masterclass_registrations (masterclass_id, lower(email));
