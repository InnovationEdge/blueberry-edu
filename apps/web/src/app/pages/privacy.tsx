import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { useDocumentTitle } from '../hooks/use-document-title';
import { useAuth } from '../context/auth-context';

type Lang = 'ka' | 'en' | 'ru';

interface Section {
  heading: string;
  body: (string | { strong: string; rest: string })[];
  list?: ({ strong?: string; rest: string } | string)[];
}

interface PrivacyContent {
  badge: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
  metaSection: {
    heading: string;
    body: string;
    metaPolicyLabel: string;
  };
  contactEmail: string;
  contactWebsite: string;
}

const PRIVACY: Record<Lang, PrivacyContent> = {
  ka: {
    badge: 'სამართლებრივი',
    title: 'კონფიდენციალურობის პოლიტიკა',
    updated: 'ბოლო განახლება: 2026 წლის 9 მაისი',
    intro:
      'წინამდებარე კონფიდენციალურობის პოლიტიკა აღწერს, თუ როგორ აგროვებს, იყენებს და იცავს Blueberry Academy (შემდგომში - „ჩვენ" ან „კომპანია") თქვენს პერსონალურ მონაცემებს, როდესაც სარგებლობთ ჩვენი ვებგვერდით blueberryedu.ge და მასთან დაკავშირებული სერვისებით (მათ შორის Meta-ს რეკლამებით - Facebook და Instagram Lead Generation ფორმებით).',
    sections: [
      {
        heading: '1. ვინ ვართ ჩვენ',
        body: [
          'Blueberry Academy არის პროფესიონალური სასწავლებელი, რომელიც გთავაზობთ ლაივ ვორკშოპებს Google Meet პლატფორმაზე და გასცემს კურსდამთავრებულის სერტიფიკატებს. კონტროლერის სტატუსით პერსონალურ მონაცემებს ამუშავებს InnovationEdge.',
          { strong: 'კონტაქტი:', rest: ' info@blueberryedu.ge' },
        ],
      },
      {
        heading: '2. რა მონაცემებს ვაგროვებთ',
        body: ['ვაგროვებთ მხოლოდ იმ მონაცემებს, რომლებიც აუცილებელია სერვისის გასაწევად:'],
        list: [
          { strong: 'საკონტაქტო ინფორმაცია:', rest: ' სახელი და გვარი, ელფოსტა, ტელეფონის ნომერი - გადმოგვეცემა სარეგისტრაციო ფორმის ან Meta Lead Generation ფორმის მეშვეობით.' },
          { strong: 'კურსის ინტერესი:', rest: ' რომელი კურსით ან მასტერკლასით ხართ დაინტერესებული.' },
          { strong: 'ტექნიკური მონაცემები:', rest: ' IP მისამართი, ბრაუზერის ტიპი, მოწყობილობა, ვიზიტის თარიღი - მხოლოდ უსაფრთხოებისა და სტატისტიკის მიზნებისთვის.' },
          { strong: 'კომუნიკაცია:', rest: ' თქვენი მიერ გამოგზავნილი შეტყობინებების შინაარსი.' },
        ],
      },
      {
        heading: '3. როგორ ვიყენებთ თქვენს მონაცემებს',
        body: [],
        list: [
          'თქვენთან კომუნიკაციისთვის - კურსის დეტალების გასაცემად, რეგისტრაციის დასადასტურებლად, კითხვებზე პასუხის გასაცემად.',
          'კურსების და მასტერკლასების შესახებ ინფორმაციის მისაწოდებლად.',
          'სერვისის ხარისხის გასაუმჯობესებლად და მომხმარებლის გამოცდილების შესაფასებლად.',
          'კანონმდებლობით გათვალისწინებული ვალდებულებების შესასრულებლად.',
        ],
      },
      {
        heading: '5. მონაცემთა გაზიარება',
        body: ['ჩვენ არ ვყიდით და არ ვაჯავშნათ თქვენს პერსონალურ მონაცემებს მესამე პირებზე. მონაცემთა დამუშავებაში გვეხმარება შემდეგი სანდო პარტნიორები:'],
        list: [
          { strong: 'Supabase', rest: ' - მონაცემთა ბაზის ჰოსტინგი (EU რეგიონი).' },
          { strong: 'Vercel', rest: ' - ვებგვერდის ჰოსტინგი.' },
          { strong: 'Google Workspace', rest: ' - ელფოსტა და Google Sheets რეგისტრაციის სარეზერვო ჩანაწერებისთვის.' },
          { strong: 'Meta Platforms', rest: ' - Lead Generation ფორმების მიწოდება და სარეკლამო ანალიტიკა.' },
        ],
      },
      {
        heading: '6. მონაცემთა შენახვის ვადა',
        body: ['სარეგისტრაციო ინფორმაცია ინახება არა უმეტეს 24 თვის განმავლობაში ბოლო კონტაქტიდან, ან მანამ, სანამ არ მოითხოვთ წაშლას. ფინანსური ჩანაწერები ინახება საქართველოს კანონმდებლობით გათვალისწინებული ვადით (6 წელი).'],
      },
      {
        heading: '7. თქვენი უფლებები',
        body: ['თქვენ გაქვთ უფლება მოითხოვოთ:'],
        list: [
          'თქვენს შესახებ შენახული მონაცემების ნახვა.',
          'არასწორი მონაცემების შესწორება.',
          'მონაცემების სრულად წაშლა (მარკეტინგული მიზნებისთვის).',
          'დამუშავების შეზღუდვა ან ამის წინააღმდეგ პროტესტი.',
          'თქვენი თანხმობის ნებისმიერ დროს გამოწვევა.',
        ],
      },
      {
        heading: '8. უსაფრთხოება',
        body: ['ვიყენებთ ინდუსტრიის სტანდარტულ ტექნიკურ და ორგანიზაციულ ზომებს - დაშიფვრა (HTTPS/TLS), წვდომის კონტროლი, რეგულარული უსაფრთხოების აუდიტი - თქვენი მონაცემების დასაცავად.'],
      },
      {
        heading: '9. ქუქი-ფაილები (Cookies)',
        body: ['ვებგვერდი იყენებს მინიმალურ ტექნიკურ ქუქი-ფაილებს სესიის მართვისა და სერვისის ფუნქციონალურობისთვის. მესამე მხარის ანალიტიკური ქუქი-ფაილები (Meta Pixel) გამოიყენება მხოლოდ თქვენი თანხმობით.'],
      },
      {
        heading: '10. ბავშვები',
        body: ['სერვისი არ არის განკუთვნილი 16 წელზე ნაკლები ასაკის პირებისთვის. ჩვენ შეგნებულად არ ვაგროვებთ მათ მონაცემებს.'],
      },
      {
        heading: '11. პოლიტიკის ცვლილებები',
        body: ['ვიტოვებთ უფლებას, განვაახლოთ ეს პოლიტიკა. ცვლილებები ძალაში შედის ვებგვერდზე გამოქვეყნების მომენტიდან. არსებითი ცვლილების შემთხვევაში გაცნობებთ ელფოსტით.'],
      },
      {
        heading: '12. კონტაქტი',
        body: ['კონფიდენციალურობასთან დაკავშირებული ნებისმიერი კითხვისთვის:'],
        list: [
          { strong: 'ელფოსტა:', rest: ' info@blueberryedu.ge' },
          { strong: 'ვებგვერდი:', rest: ' blueberryedu.ge' },
        ],
      },
    ],
    metaSection: {
      heading: '4. Meta Lead Generation',
      body: 'როდესაც ავსებთ Facebook-ის ან Instagram-ის Lead Generation ფორმას, თქვენს მიერ მითითებული მონაცემები (სახელი, ელფოსტა, ტელეფონი) Meta Platforms, Inc.-ისგან გადმოგვეცემა. ვიყენებთ ამ მონაცემებს მხოლოდ იმისთვის, რომ თქვენთვის ვუპასუხოთ მოთხოვნაზე და მოგაწოდოთ კურსის ინფორმაცია. Meta-ის სერვისების გამოყენება რეგულირდება ',
      metaPolicyLabel: 'Meta-ის კონფიდენციალურობის პოლიტიკით',
    },
    contactEmail: 'info@blueberryedu.ge',
    contactWebsite: 'blueberryedu.ge',
  },

  en: {
    badge: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: May 9, 2026',
    intro:
      'This Privacy Policy describes how Blueberry Academy ("we" or "the Company") collects, uses, and protects your personal data when you use our website blueberryedu.ge and related services (including Meta advertising - Facebook and Instagram Lead Generation forms).',
    sections: [
      {
        heading: '1. Who We Are',
        body: [
          'Blueberry Academy is a professional training school offering live workshops on Google Meet and issuing graduation certificates. Personal data is processed by InnovationEdge as the data controller.',
          { strong: 'Contact:', rest: ' info@blueberryedu.ge' },
        ],
      },
      {
        heading: '2. What Data We Collect',
        body: ['We collect only the data necessary to provide our services:'],
        list: [
          { strong: 'Contact information:', rest: ' first and last name, email, phone number - provided through registration forms or Meta Lead Generation forms.' },
          { strong: 'Course interest:', rest: ' which course or masterclass you are interested in.' },
          { strong: 'Technical data:', rest: ' IP address, browser type, device, visit date - solely for security and statistical purposes.' },
          { strong: 'Communications:', rest: ' the content of messages you send us.' },
        ],
      },
      {
        heading: '3. How We Use Your Data',
        body: [],
        list: [
          'To communicate with you - share course details, confirm registrations, answer questions.',
          'To provide information about courses and masterclasses.',
          'To improve service quality and assess user experience.',
          'To comply with legal obligations.',
        ],
      },
      {
        heading: '5. Data Sharing',
        body: ['We do not sell or rent your personal data to third parties. The following trusted partners help us process data:'],
        list: [
          { strong: 'Supabase', rest: ' - database hosting (EU region).' },
          { strong: 'Vercel', rest: ' - website hosting.' },
          { strong: 'Google Workspace', rest: ' - email and Google Sheets backup of registration records.' },
          { strong: 'Meta Platforms', rest: ' - Lead Generation form delivery and advertising analytics.' },
        ],
      },
      {
        heading: '6. Data Retention',
        body: ['Registration data is kept for no more than 24 months from the last contact, or until you request deletion. Financial records are retained for the period required by Georgian law (6 years).'],
      },
      {
        heading: '7. Your Rights',
        body: ['You have the right to request:'],
        list: [
          'Access to data we hold about you.',
          'Correction of inaccurate data.',
          'Full deletion of your data (for marketing purposes).',
          'Restriction of processing or objection to it.',
          'Withdrawal of your consent at any time.',
        ],
      },
      {
        heading: '8. Security',
        body: ['We use industry-standard technical and organizational measures - encryption (HTTPS/TLS), access control, regular security audits - to protect your data.'],
      },
      {
        heading: '9. Cookies',
        body: ['The website uses minimal technical cookies for session management and core functionality. Third-party analytics cookies (Meta Pixel) are used only with your consent.'],
      },
      {
        heading: '10. Children',
        body: ['The service is not intended for individuals under 16 years of age. We do not knowingly collect their data.'],
      },
      {
        heading: '11. Changes to This Policy',
        body: ['We reserve the right to update this policy. Changes take effect upon publication on the website. We will notify you by email of any material changes.'],
      },
      {
        heading: '12. Contact',
        body: ['For any privacy-related questions:'],
        list: [
          { strong: 'Email:', rest: ' info@blueberryedu.ge' },
          { strong: 'Website:', rest: ' blueberryedu.ge' },
        ],
      },
    ],
    metaSection: {
      heading: '4. Meta Lead Generation',
      body: 'When you fill out a Facebook or Instagram Lead Generation form, the data you provide (name, email, phone) is transmitted to us from Meta Platforms, Inc. We use this data solely to respond to your inquiry and provide course information. The use of Meta\'s services is governed by ',
      metaPolicyLabel: 'Meta\'s Privacy Policy',
    },
    contactEmail: 'info@blueberryedu.ge',
    contactWebsite: 'blueberryedu.ge',
  },

  ru: {
    badge: 'Юридическая информация',
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: 9 мая 2026 г.',
    intro:
      'Настоящая Политика конфиденциальности описывает, как Blueberry Academy (далее - «мы» или «Компания») собирает, использует и защищает ваши персональные данные при использовании сайта blueberryedu.ge и связанных сервисов (включая рекламу в Meta - формы Facebook и Instagram Lead Generation).',
    sections: [
      {
        heading: '1. Кто мы',
        body: [
          'Blueberry Academy - профессиональная школа, предлагающая живые воркшопы на Google Meet и выдающая сертификаты выпускников. Персональные данные обрабатывает InnovationEdge как контролёр данных.',
          { strong: 'Контакт:', rest: ' info@blueberryedu.ge' },
        ],
      },
      {
        heading: '2. Какие данные мы собираем',
        body: ['Мы собираем только те данные, которые необходимы для оказания услуг:'],
        list: [
          { strong: 'Контактная информация:', rest: ' имя и фамилия, email, номер телефона - передаётся через формы регистрации или формы Meta Lead Generation.' },
          { strong: 'Интерес к курсу:', rest: ' какой курс или мастер-класс вас интересует.' },
          { strong: 'Технические данные:', rest: ' IP-адрес, тип браузера, устройство, дата визита - только для целей безопасности и статистики.' },
          { strong: 'Коммуникация:', rest: ' содержание отправленных вами сообщений.' },
        ],
      },
      {
        heading: '3. Как мы используем ваши данные',
        body: [],
        list: [
          'Для связи с вами - отправки информации о курсе, подтверждения регистрации, ответов на вопросы.',
          'Для предоставления информации о курсах и мастер-классах.',
          'Для улучшения качества сервиса и оценки опыта пользователей.',
          'Для выполнения обязательств, предусмотренных законодательством.',
        ],
      },
      {
        heading: '5. Передача данных',
        body: ['Мы не продаём и не сдаём в аренду ваши персональные данные третьим лицам. В обработке данных нам помогают следующие надёжные партнёры:'],
        list: [
          { strong: 'Supabase', rest: ' - хостинг базы данных (регион ЕС).' },
          { strong: 'Vercel', rest: ' - хостинг сайта.' },
          { strong: 'Google Workspace', rest: ' - email и резервное хранение регистраций в Google Sheets.' },
          { strong: 'Meta Platforms', rest: ' - доставка форм Lead Generation и рекламная аналитика.' },
        ],
      },
      {
        heading: '6. Срок хранения данных',
        body: ['Регистрационные данные хранятся не более 24 месяцев с момента последнего контакта или до запроса на удаление. Финансовые записи хранятся в течение срока, установленного законодательством Грузии (6 лет).'],
      },
      {
        heading: '7. Ваши права',
        body: ['Вы имеете право запросить:'],
        list: [
          'Доступ к данным, которые мы храним о вас.',
          'Исправление неточных данных.',
          'Полное удаление ваших данных (для маркетинговых целей).',
          'Ограничение обработки или возражение против неё.',
          'Отзыв вашего согласия в любое время.',
        ],
      },
      {
        heading: '8. Безопасность',
        body: ['Мы применяем стандартные для отрасли технические и организационные меры - шифрование (HTTPS/TLS), контроль доступа, регулярные аудиты безопасности - для защиты ваших данных.'],
      },
      {
        heading: '9. Cookie-файлы',
        body: ['Сайт использует минимальные технические cookie для управления сессией и функциональности. Аналитические cookie третьих сторон (Meta Pixel) используются только с вашего согласия.'],
      },
      {
        heading: '10. Дети',
        body: ['Сервис не предназначен для лиц младше 16 лет. Мы сознательно не собираем их данные.'],
      },
      {
        heading: '11. Изменения политики',
        body: ['Мы оставляем за собой право обновлять данную политику. Изменения вступают в силу с момента публикации на сайте. О существенных изменениях мы уведомим вас по email.'],
      },
      {
        heading: '12. Контакты',
        body: ['По любым вопросам, связанным с конфиденциальностью:'],
        list: [
          { strong: 'Email:', rest: ' info@blueberryedu.ge' },
          { strong: 'Сайт:', rest: ' blueberryedu.ge' },
        ],
      },
    ],
    metaSection: {
      heading: '4. Meta Lead Generation',
      body: 'Когда вы заполняете форму Lead Generation на Facebook или Instagram, указанные вами данные (имя, email, телефон) передаются нам от Meta Platforms, Inc. Мы используем эти данные исключительно для ответа на ваш запрос и предоставления информации о курсе. Использование сервисов Meta регулируется ',
      metaPolicyLabel: 'Политикой конфиденциальности Meta',
    },
    contactEmail: 'info@blueberryedu.ge',
    contactWebsite: 'blueberryedu.ge',
  },
};

function renderBody(items: Section['body']) {
  return items.map((item, i) => {
    if (typeof item === 'string') {
      return (
        <p key={i} className="text-base text-foreground-subtle">
          {item}
        </p>
      );
    }
    return (
      <p key={i} className="text-base text-foreground-subtle">
        <strong>{item.strong}</strong>
        {item.rest}
      </p>
    );
  });
}

function renderList(items: NonNullable<Section['list']>) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-base text-foreground-subtle">
      {items.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? item : (
            <>
              {item.strong && <strong>{item.strong}</strong>}
              {item.rest}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Privacy() {
  const { language } = useAuth();
  const t = PRIVACY[language as Lang] ?? PRIVACY.ka;

  useDocumentTitle(t.title);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/privacy" />
      <div className="h-[72px]" />

      <section className="relative bg-[#004aad] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-40%] right-[-15%] w-[700px] h-[700px] bg-white/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-[900px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">{t.badge}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-4">
            {t.title}
          </h1>
          <p className="text-white/60 text-sm">{t.updated}</p>
        </div>
      </section>

      <article className="max-w-[820px] mx-auto px-6 md:px-12 py-16 md:py-20 space-y-10 text-foreground leading-relaxed">
        <section className="space-y-3">
          <p className="text-base text-foreground-subtle">{t.intro}</p>
        </section>

        {t.sections.slice(0, 3).map((s, i) => (
          <section key={i} className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">{s.heading}</h2>
            {renderBody(s.body)}
            {s.list && renderList(s.list)}
          </section>
        ))}

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">{t.metaSection.heading}</h2>
          <p className="text-base text-foreground-subtle">
            {t.metaSection.body}
            <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
              {t.metaSection.metaPolicyLabel}
            </a>
            .
          </p>
        </section>

        {t.sections.slice(3).map((s, i) => (
          <section key={i} className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">{s.heading}</h2>
            {renderBody(s.body)}
            {s.list && renderList(s.list)}
          </section>
        ))}
      </article>

      <LandingFooter />
    </div>
  );
}
