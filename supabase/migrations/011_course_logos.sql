-- Update course logos (inline SVG icons)

-- #1 React Native (already has logo, skip)

-- #2 UI/UX Design
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="22" height="22" rx="4" stroke="#8B5CF6" stroke-width="2"/><circle cx="14" cy="12" r="3" fill="#8B5CF6"/><path d="M8 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/></svg>'
WHERE id = 2;

-- #3 Meta Advertising
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 4L4 9l10 5 10-5-10-5z" fill="#3B82F6"/><path d="M4 14l10 5 10-5" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19l10 5 10-5" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WHERE id = 3;

-- #4 SEO & Content
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="7" stroke="#10B981" stroke-width="2"/><path d="M17 17l7 7" stroke="#10B981" stroke-width="2" stroke-linecap="round"/><path d="M9 12h6M12 9v6" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/></svg>'
WHERE id = 4;

-- #5 Vibe Coding
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="24" height="18" rx="3" stroke="#F59E0B" stroke-width="2"/><path d="M8 11l3 3-3 3M14 17h5" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WHERE id = 5;

-- #6 Data Analytics
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="16" width="4" height="8" rx="1" fill="#6366F1"/><rect x="12" y="10" width="4" height="14" rx="1" fill="#6366F1"/><rect x="20" y="4" width="4" height="20" rx="1" fill="#6366F1"/></svg>'
WHERE id = 6;

-- #7 Cyber Security
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 3L4 7v6c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12V7l-10-4z" stroke="#EF4444" stroke-width="2"/><path d="M10 14l3 3 5-6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WHERE id = 7;

-- #8 Product Management
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="10" height="10" rx="2" fill="#EC4899"/><rect x="15" y="3" width="10" height="10" rx="2" stroke="#EC4899" stroke-width="2"/><rect x="3" y="15" width="10" height="10" rx="2" stroke="#EC4899" stroke-width="2"/><rect x="15" y="15" width="10" height="10" rx="2" fill="#EC4899"/></svg>'
WHERE id = 8;

-- #9 გაყიდვების კურსი
UPDATE courses SET logo = '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 4v20M4 14h20" stroke="#F97316" stroke-width="2" stroke-linecap="round"/><circle cx="14" cy="14" r="10" stroke="#F97316" stroke-width="2"/><path d="M10 10l8 8M18 10l-8 8" stroke="#F97316" stroke-width="1" stroke-linecap="round" opacity="0.3"/></svg>'
WHERE id = 9;
