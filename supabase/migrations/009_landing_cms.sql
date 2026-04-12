-- ═══ Landing CMS: stats, testimonials, FAQ ═══

-- STATS
create table if not exists landing_stats (
  id bigserial primary key,
  value integer not null,
  suffix text not null default '',
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table landing_stats enable row level security;

drop policy if exists "landing_stats public read" on landing_stats;
create policy "landing_stats public read" on landing_stats
  for select using (true);

drop policy if exists "landing_stats admin write" on landing_stats;
create policy "landing_stats admin write" on landing_stats
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- TESTIMONIALS
create table if not exists landing_testimonials (
  id bigserial primary key,
  quote text not null,
  name text not null,
  role text not null default '',
  avatar text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table landing_testimonials enable row level security;

drop policy if exists "landing_testimonials public read" on landing_testimonials;
create policy "landing_testimonials public read" on landing_testimonials
  for select using (true);

drop policy if exists "landing_testimonials admin write" on landing_testimonials;
create policy "landing_testimonials admin write" on landing_testimonials
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- FAQ
create table if not exists landing_faq (
  id bigserial primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table landing_faq enable row level security;

drop policy if exists "landing_faq public read" on landing_faq;
create policy "landing_faq public read" on landing_faq
  for select using (true);

drop policy if exists "landing_faq admin write" on landing_faq;
create policy "landing_faq admin write" on landing_faq
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══ SEED DATA ═══

insert into landing_stats (value, suffix, label, sort_order) values
  (500, '+', 'კურსდამთავრებული', 1),
  (98, '%', 'დასაქმდა', 2),
  (50, '+', 'კურსი', 3),
  (30, '+', 'ინსტრუქტორი', 4)
on conflict do nothing;

insert into landing_testimonials (quote, name, role, avatar, sort_order) values
  ('Blueberry-ზე ბიზნეს კურსის შემდეგ საკუთარი სტარტაპი წამოვიწყე.', 'ნინო კვარაცხელია', 'სტარტაპის დამფუძნებელი', 'ნ', 1),
  ('პროგრამირების კურსი ნულიდან დავიწყე და 4 თვეში პირველი სამსახური ვიშოვე.', 'გიორგი ბერიძე', 'Junior Developer', 'გ', 2),
  ('დიზაინის კურსმა კარიერა შემიცვალა. ფრილანსერად ვმუშაობ საერთაშორისო კლიენტებთან.', 'მარიამ ჯავახიშვილი', 'UX/UI დიზაინერი', 'მ', 3),
  ('მარკეტინგის კურსმა კომპანიის გაყიდვები 3-ჯერ გაზარდა.', 'ანა გოგიჩაიშვილი', 'მარკეტინგის მენეჯერი', 'ა', 4)
on conflict do nothing;

insert into landing_faq (question, answer, sort_order) values
  ('რა არის Blueberry?', 'Blueberry არის ონლაინ სასწავლო პლატფორმა, სადაც შეგიძლია შეიძინო კურსები საუკეთესო ქართველი და საერთაშორისო ინსტრუქტორებისგან.', 1),
  ('როგორ მუშაობს გადახდა?', 'შეარჩიე კურსი, გადაიხადე ერთჯერადი თანხა და მიიღე უვადო წვდომა. არანაირი გამოწერა.', 2),
  ('სად შემიძლია ვუყურო?', 'ნებისმიერ მოწყობილობაზე — კომპიუტერზე, ტელეფონზე, ტაბლეტზე ან Smart TV-ზე.', 3),
  ('შემიძლია თანხის დაბრუნება?', '30-დღიანი თანხის დაბრუნების გარანტია. თუ კურსი არ მოგეწონა, სრულ თანხას დაგიბრუნებთ.', 4),
  ('რა მივიღებ კურსის დასრულებისას?', 'ვერიფიცირებულ სერტიფიკატს, რომელიც გააზიარე LinkedIn-ზე ან დაამატე რეზიუმეში.', 5)
on conflict do nothing;
