CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tribe TEXT NOT NULL,
  duration TEXT NOT NULL,
  price INTEGER NOT NULL,
  format TEXT DEFAULT 'ონლაინ',
  gradient TEXT,
  logo TEXT,
  popular BOOLEAN DEFAULT false,
  mentor_name TEXT,
  mentor_role TEXT,
  schedule_days TEXT,
  schedule_time TEXT,
  start_date TEXT,
  level TEXT DEFAULT 'დამწყები',
  language TEXT DEFAULT 'ქართული',
  learning_outcomes TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE course_syllabus (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  topics TEXT[] NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE course_faq (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE course_registrations (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE masterclasses (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE masterclass_registrations (
  id SERIAL PRIMARY KEY,
  masterclass_id INTEGER REFERENCES masterclasses(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_syllabus ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE masterclasses ENABLE ROW LEVEL SECURITY;
ALTER TABLE masterclass_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public read syllabus" ON course_syllabus FOR SELECT USING (true);
CREATE POLICY "Public read faq" ON course_faq FOR SELECT USING (true);
CREATE POLICY "Public read masterclasses" ON masterclasses FOR SELECT USING (true);
CREATE POLICY "Public register courses" ON course_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public register masterclasses" ON masterclass_registrations FOR INSERT WITH CHECK (true);
