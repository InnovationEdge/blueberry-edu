export interface CourseDetail {
  fullDesc: string;
  learningOutcomes: string[];
  mentor: { name: string; role: string };
  schedule: { days: string; time: string };
  startDate: string;
  level: string;
  language: string;
  syllabus: { title: string; topics: string[] }[];
  faq: { q: string; a: string }[];
}

export const COURSE_DETAILS: Record<number, CourseDetail> = {
  1: {
    fullDesc: 'React Native კურსი განკუთვნილია იმ ადამიანებისთვის, ვისაც სურთ მობილური აპლიკაციების შექმნა iOS და Android პლატფორმებისთვის ერთი კოდის ბაზით. კურსის განმავლობაში შეისწავლი React Native-ის ფუნდამენტებს, ნავიგაციას, state management-ს და რეალური აპლიკაციის აწყობას ნულიდან.',
    learningOutcomes: [
      'React Native-ის ფუნდამენტური კონცეფციები და კომპონენტები',
      'ნავიგაცია, state management და API ინტეგრაცია',
      'Expo და EAS Build-ის გამოყენება',
      'App Store და Google Play-ში გამოქვეყნება',
      'რეალური პროექტის შექმნა პორტფოლიოსთვის',
    ],
    mentor: { name: 'გიორგი ბერიძე', role: 'Senior Mobile Developer' },
    schedule: { days: 'სამშაბათი, ხუთშაბათი', time: '19:00 - 21:00' },
    startDate: '28 აპრ. 2026',
    level: 'საშუალო',
    language: 'ქართული',
    syllabus: [
      { title: 'React Native საფუძვლები', topics: ['კომპონენტები და JSX', 'Props და State', 'StyleSheet და Flexbox', 'ScrollView და FlatList'] },
      { title: 'ნავიგაცია', topics: ['React Navigation setup', 'Stack, Tab, Drawer navigators', 'Deep linking', 'Navigation state management'] },
      { title: 'State Management', topics: ['Context API', 'Zustand/Redux', 'AsyncStorage', 'Global state patterns'] },
      { title: 'API ინტეგრაცია', topics: ['Fetch და Axios', 'REST API-თან მუშაობა', 'Loading და Error states', 'Caching strategies'] },
      { title: 'UI/UX პატერნები', topics: ['ანიმაციები Reanimated-ით', 'Gesture Handler', 'Custom components', 'Platform-specific design'] },
      { title: 'გამოქვეყნება', topics: ['Expo EAS Build', 'App Store submission', 'Google Play submission', 'CI/CD pipeline'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა პროგრამირების გამოცდილება?', a: 'JavaScript-ის ძირითადი ცოდნა რეკომენდებულია, თუმცა კურსი მოიცავს საბაზისო განხილვას.' },
      { q: 'რა მოწყობილობა მჭირდება?', a: 'კომპიუტერი (Mac რეკომენდებულია iOS-ისთვის), ინტერნეტ კავშირი და ტელეფონი ტესტირებისთვის.' },
      { q: 'მივიღებ თუ არა სერტიფიკატს?', a: 'დიახ, კურსის წარმატებით დასრულების შემდეგ მიიღებ ვერიფიცირებულ სერტიფიკატს.' },
    ],
  },
  2: {
    fullDesc: 'UI/UX Design კურსი მოიცავს Figma-ში მუშაობას, მომხმარებლის კვლევას, wireframing-ს, პროტოტიპირებას და დიზაინ სისტემების შექმნას. კურსი გასწავლის თანამედროვე დიზაინის პრინციპებს და პრაქტიკულ უნარებს.',
    learningOutcomes: [
      'Figma-ს სრული ფუნქციონალი',
      'User Research მეთოდოლოგიები',
      'Wireframing და პროტოტიპირება',
      'Design System შექმნა',
      'პორტფოლიოს მომზადება',
    ],
    mentor: { name: 'მარიამ ჯავახიშვილი', role: 'Lead UX Designer' },
    schedule: { days: 'ორშაბათი, ოთხშაბათი', time: '18:30 - 20:30' },
    startDate: '5 მაი. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'Figma საფუძვლები', topics: ['Interface და Tools', 'Frames და Components', 'Auto Layout', 'Variants'] },
      { title: 'User Research', topics: ['Interview techniques', 'User Personas', 'Journey Mapping', 'Competitive Analysis'] },
      { title: 'Wireframing', topics: ['Low-fidelity wireframes', 'Information Architecture', 'User Flows', 'Rapid prototyping'] },
      { title: 'Visual Design', topics: ['Typography', 'Color Theory', 'Grid Systems', 'Iconography'] },
      { title: 'Design Systems', topics: ['Component Library', 'Design Tokens', 'Documentation', 'Handoff to developers'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა დიზაინის გამოცდილება?', a: 'არა, კურსი დამწყებებისთვისაა განკუთვნილი და ნულიდან ისწავლება.' },
      { q: 'რა პროგრამა მჭირდება?', a: 'Figma (უფასო ვერსია საკმარისია), ბრაუზერი და ინტერნეტი.' },
      { q: 'რამდენი პროექტი შევქმნი?', a: 'კურსის განმავლობაში მინიმუმ 3 სრულ პროექტს შექმნი პორტფოლიოსთვის.' },
    ],
  },
  3: {
    fullDesc: 'Meta Advertising კურსი გასწავლის Facebook და Instagram რეკლამის მართვას, აუდიტორიის ტარგეტირებას, A/B ტესტირებას და რეკლამის ანალიტიკას. შეისწავლი Meta Business Suite-ის და Ads Manager-ის სრულ ფუნქციონალს.',
    learningOutcomes: [
      'Meta Ads Manager-ის სრული ათვისება',
      'აუდიტორიის ტარგეტირება და Lookalike audiences',
      'A/B ტესტირება და ოპტიმიზაცია',
      'Pixel-ის ინსტალაცია და კონვერსიის თრექინგი',
      'რეკლამის ბიუჯეტის ეფექტური მართვა',
    ],
    mentor: { name: 'ანა წიკლაური', role: 'Performance Marketing Lead' },
    schedule: { days: 'ოთხშაბათი, პარასკევი', time: '19:00 - 21:00' },
    startDate: '12 მაი. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'Meta ეკოსისტემა', topics: ['Business Suite მიმოხილვა', 'Ads Manager ინტერფეისი', 'Page და Account setup', 'Billing და Payments'] },
      { title: 'კამპანიის სტრუქტურა', topics: ['Campaign objectives', 'Ad Sets და Ads', 'Budget და Schedule', 'Placement options'] },
      { title: 'ტარგეტირება', topics: ['Core audiences', 'Custom audiences', 'Lookalike audiences', 'Retargeting strategies'] },
      { title: 'კრეატივები', topics: ['Ad formats', 'Copy writing', 'Visual best practices', 'Dynamic creative'] },
      { title: 'ანალიტიკა და ოპტიმიზაცია', topics: ['Pixel setup', 'Conversion tracking', 'A/B testing', 'Reporting და Insights'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა მარკეტინგის გამოცდილება?', a: 'არა, კურსი ნულიდან იწყება და ეტაპობრივად მოიცავს ყველა საჭირო თემას.' },
      { q: 'მჭირდება თუ არა რეკლამის ბიუჯეტი?', a: 'პრაქტიკული სავარჯიშოებისთვის მინიმალური ბიუჯეტი რეკომენდებულია, თუმცა არ არის სავალდებულო.' },
      { q: 'რომელ პლატფორმებს მოიცავს?', a: 'Facebook, Instagram, Messenger და Audience Network.' },
    ],
  },
  4: {
    fullDesc: 'SEO & Content კურსი გასწავლის საძიებო ოპტიმიზაციის თანამედროვე ტექნიკებს, კონტენტ სტრატეგიის შემუშავებას, keyword research-ს და ანალიტიკას Google-ის ინსტრუმენტების გამოყენებით.',
    learningOutcomes: [
      'On-page და Off-page SEO ოპტიმიზაცია',
      'Keyword Research და Content Strategy',
      'Google Analytics და Search Console',
      'Technical SEO და Site Audit',
      'კონტენტის დაგეგმვა და შექმნა',
    ],
    mentor: { name: 'დავით ხარაიშვილი', role: 'SEO & Content Strategist' },
    schedule: { days: 'სამშაბათი, ხუთშაბათი', time: '18:00 - 20:00' },
    startDate: '7 მაი. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'SEO საფუძვლები', topics: ['როგორ მუშაობს Google', 'Crawling და Indexing', 'Ranking ფაქტორები', 'SERP ანალიზი'] },
      { title: 'Keyword Research', topics: ['Keyword tools', 'Search intent', 'Long-tail keywords', 'Competitor analysis'] },
      { title: 'On-page SEO', topics: ['Title tags და Meta descriptions', 'Header structure', 'Internal linking', 'Image optimization'] },
      { title: 'Content Strategy', topics: ['Content calendar', 'Blog writing', 'Content pillars', 'Distribution channels'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა ვებსაიტი?', a: 'არა, პრაქტიკულ სავარჯიშოებს შევასრულებთ სადემონსტრაციო საიტებზე.' },
      { q: 'რა ინსტრუმენტებს გამოვიყენებთ?', a: 'Google Analytics, Search Console, Ahrefs, SEMrush და სხვა.' },
      { q: 'რამდენ ხანში იქნება შედეგი?', a: 'SEO გრძელვადიანი სტრატეგიაა, პირველი შედეგები 2-3 თვეში ჩანს.' },
    ],
  },
  5: {
    fullDesc: 'Vibe Coding კურსი გასწავლის AI-ის გამოყენებით კოდის წერას და აპლიკაციების შექმნას. შეისწავლი ChatGPT, Claude, Cursor და სხვა AI ინსტრუმენტების ეფექტურ გამოყენებას პროგრამირებაში.',
    learningOutcomes: [
      'AI ინსტრუმენტების ეფექტური გამოყენება კოდინგში',
      'Prompt Engineering პრინციპები',
      'ვებ აპლიკაციის შექმნა AI-ით',
      'მობილური აპის პროტოტიპირება',
      'AI-ით პროდუქტიულობის გაზრდა',
    ],
    mentor: { name: 'ლუკა მეგრელიშვილი', role: 'AI Engineer' },
    schedule: { days: 'ორშაბათი, ოთხშაბათი', time: '19:00 - 21:00' },
    startDate: '14 მაი. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'AI კოდინგის საფუძვლები', topics: ['AI ინსტრუმენტების მიმოხილვა', 'Prompt Engineering', 'ChatGPT და Claude', 'Cursor IDE setup'] },
      { title: 'ვებ აპლიკაციები', topics: ['HTML/CSS AI-ით', 'React კომპონენტები', 'API ინტეგრაცია', 'Deployment'] },
      { title: 'მობილური აპლიკაციები', topics: ['React Native AI-ით', 'UI კომპონენტები', 'ნავიგაცია', 'პროტოტიპირება'] },
      { title: 'პროექტი', topics: ['იდეიდან პროდუქტამდე', 'Full-stack app', 'Testing', 'გამოქვეყნება'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა პროგრამირების ცოდნა?', a: 'არა, კურსი სწორედ იმისთვისაა განკუთვნილი, ვისაც კოდინგის გამოცდილება არ აქვს.' },
      { q: 'რა AI ინსტრუმენტებს გამოვიყენებთ?', a: 'ChatGPT, Claude, Cursor, v0, Bolt და სხვა თანამედროვე AI tools.' },
      { q: 'შევძლებ თუ არა რეალური აპლიკაციის შექმნას?', a: 'დიახ, კურსის ბოლოს გექნება მზა აპლიკაცია, რომლის გამოქვეყნებაც შეგიძლია.' },
    ],
  },
  6: {
    fullDesc: 'Data Analytics კურსი მოიცავს მონაცემთა ანალიზს Python-ით, ვიზუალიზაციას, SQL-ს და ბიზნეს ინტელიჯენს ინსტრუმენტებს. შეისწავლი მონაცემების შეგროვებას, დამუშავებას და ვიზუალურ წარმოდგენას.',
    learningOutcomes: [
      'Python-ით მონაცემთა ანალიზი (Pandas, NumPy)',
      'მონაცემთა ვიზუალიზაცია (Matplotlib, Seaborn)',
      'SQL მოთხოვნები და მონაცემთა ბაზები',
      'Power BI და Tableau-ს საფუძვლები',
      'რეალურ მონაცემებზე პროექტის შესრულება',
    ],
    mentor: { name: 'ნიკა ჩაჩანიძე', role: 'Data Analyst' },
    schedule: { days: 'სამშაბათი, ხუთშაბათი', time: '18:30 - 20:30' },
    startDate: '21 მაი. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'Python საფუძვლები', topics: ['Python basics', 'Data types', 'Functions', 'Libraries installation'] },
      { title: 'Pandas & NumPy', topics: ['DataFrames', 'Data cleaning', 'Grouping და Aggregation', 'Merge და Join'] },
      { title: 'ვიზუალიზაცია', topics: ['Matplotlib', 'Seaborn', 'Interactive charts', 'Dashboard creation'] },
      { title: 'SQL', topics: ['SELECT queries', 'JOINs', 'Subqueries', 'Window functions'] },
      { title: 'BI ინსტრუმენტები', topics: ['Power BI basics', 'Tableau introduction', 'Report building', 'Data storytelling'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა პროგრამირების ცოდნა?', a: 'არა, Python-ს ნულიდან ვისწავლით კურსის ფარგლებში.' },
      { q: 'რა სფეროში შემიძლია მუშაობა?', a: 'Data Analyst, Business Analyst, BI Analyst და სხვა მონაცემებთან დაკავშირებულ პოზიციებზე.' },
      { q: 'რამდენი პროექტი იქნება?', a: 'კურსის განმავლობაში მინიმუმ 4 პრაქტიკულ პროექტს შეასრულებ.' },
    ],
  },
  7: {
    fullDesc: 'Cyber Security კურსი მოიცავს კიბერუსაფრთხოების საფუძვლებს, ეთიკურ ჰაკინგს, ქსელის უსაფრთხოებას და ინციდენტებზე რეაგირებას. შეისწავლი თანამედროვე კიბერსაფრთხეებს და მათ წინააღმდეგ ბრძოლის მეთოდებს.',
    learningOutcomes: [
      'კიბერუსაფრთხოების ფუნდამენტური პრინციპები',
      'ეთიკური ჰაკინგი და Penetration Testing',
      'ქსელის უსაფრთხოება და Firewall-ები',
      'OWASP Top 10 და ვებ უსაფრთხოება',
      'ინციდენტების მართვა და ფორენზიკა',
    ],
    mentor: { name: 'ალექსანდრე ქურდაძე', role: 'Cybersecurity Engineer' },
    schedule: { days: 'ორშაბათი, ოთხშაბათი, პარასკევი', time: '19:00 - 21:00' },
    startDate: '19 მაი. 2026',
    level: 'საშუალო',
    language: 'ქართული',
    syllabus: [
      { title: 'კიბერუსაფრთხოების საფუძვლები', topics: ['CIA Triad', 'Threat Landscape', 'Risk Assessment', 'Security Frameworks'] },
      { title: 'ქსელის უსაფრთხოება', topics: ['TCP/IP', 'Firewalls და IDS', 'VPN', 'Network monitoring'] },
      { title: 'ეთიკური ჰაკინგი', topics: ['Reconnaissance', 'Vulnerability scanning', 'Exploitation', 'Reporting'] },
      { title: 'ვებ უსაფრთხოება', topics: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF'] },
      { title: 'Incident Response', topics: ['Detection', 'Analysis', 'Containment', 'Recovery'] },
      { title: 'ფორენზიკა', topics: ['Digital forensics', 'Log analysis', 'Malware analysis', 'Case studies'] },
    ],
    faq: [
      { q: 'საჭიროა თუ არა IT გამოცდილება?', a: 'ძირითადი კომპიუტერული ცოდნა საკმარისია, თუმცა ქსელების ცოდნა პლუსია.' },
      { q: 'რა სერტიფიკატისთვის მომამზადებს?', a: 'კურსი მოგამზადებს CompTIA Security+ და CEH გამოცდისთვის.' },
      { q: 'ლეგალურია თუ არა ეთიკური ჰაკინგი?', a: 'დიახ, ეთიკური ჰაკინგი ნებართვით ხდება და სრულად ლეგალურია. პრაქტიკა მხოლოდ ლაბ გარემოში.' },
    ],
  },
  8: {
    fullDesc: 'Product Management კურსი მოიცავს პროდუქტის მართვის მეთოდოლოგიებს, მომხმარებლის კვლევას, Agile ფრეიმვორქებს, ანალიტიკას და სტრატეგიულ დაგეგმვას. შეისწავლი პროდუქტის სასიცოცხლო ციკლის მართვას.',
    learningOutcomes: [
      'პროდუქტის სტრატეგიის შემუშავება',
      'User Research და Customer Discovery',
      'Agile/Scrum მეთოდოლოგია',
      'პროდუქტის მეტრიკები და ანალიტიკა',
      'Roadmap-ის შექმნა და პრიორიტიზაცია',
    ],
    mentor: { name: 'თამარ ბაგრატიონი', role: 'Senior Product Manager' },
    schedule: { days: 'სამშაბათი, ხუთშაბათი', time: '19:30 - 21:30' },
    startDate: '26 მაი. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'PM საფუძვლები', topics: ['Product Manager-ის როლი', 'Product Life Cycle', 'Market Research', 'Competitive Analysis'] },
      { title: 'User Research', topics: ['User Interviews', 'Surveys', 'Personas', 'Jobs to be Done'] },
      { title: 'Agile & Scrum', topics: ['Agile principles', 'Sprint planning', 'User Stories', 'Backlog management'] },
      { title: 'სტრატეგია', topics: ['Vision და Strategy', 'Roadmapping', 'Prioritization frameworks', 'OKRs'] },
      { title: 'ანალიტიკა', topics: ['KPIs და Metrics', 'Funnel analysis', 'A/B testing', 'Data-driven decisions'] },
    ],
    faq: [
      { q: 'ვისთვისაა კურსი?', a: 'ყველასთვის, ვისაც სურს Product Manager-ის კარიერის დაწყება ან არსებული უნარების გაღრმავება.' },
      { q: 'საჭიროა თუ არა ტექნიკური ბექგრაუნდი?', a: 'არა, კურსი ტექნიკურ და არატექნიკურ ადამიანებს ერთნაირად ესადაგება.' },
      { q: 'რა ინსტრუმენტებს გამოვიყენებთ?', a: 'Jira, Notion, Miro, Mixpanel და სხვა PM ინსტრუმენტები.' },
    ],
  },
  9: {
    fullDesc: 'გაყიდვების კურსი მოიცავს თანამედროვე გაყიდვების ტექნიკებს, მოლაპარაკებებს, CRM სისტემებს და კლიენტებთან ურთიერთობის მართვას. შეისწავლი B2B და B2C გაყიდვების სტრატეგიებს.',
    learningOutcomes: [
      'გაყიდვების თანამედროვე ტექნიკები და მეთოდები',
      'მოლაპარაკებების წარმართვა და Objection Handling',
      'CRM სისტემების (HubSpot, Salesforce) გამოყენება',
      'გაყიდვების Funnel-ის მართვა',
      'კლიენტთა ბაზის აღრიცხვა და ანალიზი',
    ],
    mentor: { name: 'გიორგი შაქარაშვილი', role: 'Head of Sales' },
    schedule: { days: 'ორშაბათი, პარასკევი', time: '18:00 - 20:00' },
    startDate: '2 ივნ. 2026',
    level: 'დამწყები',
    language: 'ქართული',
    syllabus: [
      { title: 'გაყიდვების საფუძვლები', topics: ['Sales mindset', 'Buyer psychology', 'Sales process', 'Pipeline management'] },
      { title: 'კომუნიკაცია', topics: ['Active listening', 'Rapport building', 'Presentation skills', 'Storytelling'] },
      { title: 'მოლაპარაკებები', topics: ['Negotiation strategies', 'Objection handling', 'Closing techniques', 'Win-win approach'] },
      { title: 'CRM სისტემები', topics: ['HubSpot setup', 'Lead management', 'Deal tracking', 'Reporting'] },
    ],
    faq: [
      { q: 'ვისთვისაა კურსი?', a: 'გაყიდვების მენეჯერებისთვის, მეწარმეებისთვის და ყველასთვის, ვისაც კლიენტებთან ურთიერთობა უწევს.' },
      { q: 'B2B თუ B2C გაყიდვებს მოიცავს?', a: 'ორივეს, აქცენტი ორივე მიმართულების სტრატეგიებზეა.' },
      { q: 'პრაქტიკული სავარჯიშოები იქნება?', a: 'დიახ, როლური თამაშები, რეალური კეისები და CRM-ში პრაქტიკული მუშაობა.' },
    ],
  },
};

export const DEFAULT_DETAIL: CourseDetail = {
  fullDesc: 'კურსი განკუთვნილია იმ ადამიანებისთვის, ვინც ამ სფეროში კარიერის დაწყებას ან გაღრმავებას გეგმავს. კურსი მოიცავს თეორიულ და პრაქტიკულ მასალას.',
  learningOutcomes: [
    'საფუძვლების სრული ათვისება',
    'პრაქტიკული პროექტების შექმნა',
    'რეალურ ინსტრუმენტებთან მუშაობა',
    'პორტფოლიოს მომზადება',
    'სერტიფიკატის მიღება',
  ],
  mentor: { name: 'შალვა სილაგაძე', role: 'ინსტრუქტორი' },
  schedule: { days: 'სამშაბათი, პარასკევი', time: '19:30 - 21:30' },
  startDate: '28 აპრ. 2026',
  level: 'დამწყები',
  language: 'ქართული',
  syllabus: [
    { title: 'შესავალი', topics: ['სფეროს მიმოხილვა', 'ინსტრუმენტები', 'გარემოს მომზადება'] },
    { title: 'საფუძვლები', topics: ['ძირითადი კონცეფციები', 'პრაქტიკული სავარჯიშოები', 'პირველი პროექტი'] },
    { title: 'მოწინავე თემები', topics: ['რეალური სცენარები', 'Best practices', 'ოპტიმიზაცია'] },
    { title: 'ფინალური პროექტი', topics: ['დაგეგმვა', 'იმპლემენტაცია', 'პრეზენტაცია'] },
  ],
  faq: [
    { q: 'საჭიროა თუ არა წინასწარი ცოდნა?', a: 'არა, კურსი დამწყებებისთვისაა და ნულიდან ისწავლება.' },
    { q: 'მივიღებ თუ არა სერტიფიკატს?', a: 'დიახ, კურსის წარმატებით დასრულების შემდეგ მიიღებ ვერიფიცირებულ სერტიფიკატს.' },
    { q: 'როგორია სწავლის ფორმატი?', a: 'ონლაინ, ლაივ ლექციები ინტერაქტიული სავარჯიშოებით.' },
  ],
};
