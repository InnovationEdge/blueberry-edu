import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { useDocumentTitle } from '../hooks/use-document-title';

export function Privacy() {
  useDocumentTitle('კონფიდენციალურობის პოლიტიკა');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/privacy" />
      <div className="h-[72px]" />

      <section className="relative bg-[#004aad] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-40%] right-[-15%] w-[700px] h-[700px] bg-white/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-[900px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">სამართლებრივი</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-4">
            კონფიდენციალურობის პოლიტიკა
          </h1>
          <p className="text-white/60 text-sm">ბოლო განახლება: 2026 წლის 9 მაისი</p>
        </div>
      </section>

      <article className="max-w-[820px] mx-auto px-6 md:px-12 py-16 md:py-20 space-y-10 text-foreground leading-relaxed">
        <section className="space-y-3">
          <p className="text-base text-foreground-subtle">
            წინამდებარე კონფიდენციალურობის პოლიტიკა აღწერს, თუ როგორ აგროვებს, იყენებს და იცავს Blueberry Academy
            (შემდგომში — „ჩვენ" ან „კომპანია") თქვენს პერსონალურ მონაცემებს, როდესაც სარგებლობთ ჩვენი ვებგვერდით
            <a href="https://blueberryedu.ge" className="text-brand hover:underline"> blueberryedu.ge</a> და მასთან
            დაკავშირებული სერვისებით (მათ შორის Meta-ს რეკლამებით — Facebook და Instagram Lead Generation ფორმებით).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">1. ვინ ვართ ჩვენ</h2>
          <p className="text-base text-foreground-subtle">
            Blueberry Academy არის პროფესიონალური სასწავლებელი, რომელიც გთავაზობთ ლაივ ვორკშოპებს Google Meet
            პლატფორმაზე და გასცემს კურსდამთავრებულის სერტიფიკატებს. კონტროლერის სტატუსით პერსონალურ მონაცემებს
            ამუშავებს InnovationEdge.
          </p>
          <p className="text-base text-foreground-subtle">
            <strong>კონტაქტი:</strong> info@blueberryedu.ge
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">2. რა მონაცემებს ვაგროვებთ</h2>
          <p className="text-base text-foreground-subtle">
            ვაგროვებთ მხოლოდ იმ მონაცემებს, რომლებიც აუცილებელია სერვისის გასაწევად:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground-subtle">
            <li><strong>საკონტაქტო ინფორმაცია:</strong> სახელი და გვარი, ელფოსტა, ტელეფონის ნომერი — გადმოგვეცემა
              სარეგისტრაციო ფორმის ან Meta Lead Generation ფორმის მეშვეობით.</li>
            <li><strong>კურსის ინტერესი:</strong> რომელი კურსით ან მასტერკლასით ხართ დაინტერესებული.</li>
            <li><strong>ტექნიკური მონაცემები:</strong> IP მისამართი, ბრაუზერის ტიპი, მოწყობილობა, ვიზიტის თარიღი —
              მხოლოდ უსაფრთხოებისა და სტატისტიკის მიზნებისთვის.</li>
            <li><strong>კომუნიკაცია:</strong> თქვენი მიერ გამოგზავნილი შეტყობინებების შინაარსი.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">3. როგორ ვიყენებთ თქვენს მონაცემებს</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground-subtle">
            <li>თქვენთან კომუნიკაციისთვის — კურსის დეტალების გასაცემად, რეგისტრაციის დასადასტურებლად, კითხვებზე
              პასუხის გასაცემად.</li>
            <li>კურსების და მასტერკლასების შესახებ ინფორმაციის მისაწოდებლად.</li>
            <li>სერვისის ხარისხის გასაუმჯობესებლად და მომხმარებლის გამოცდილების შესაფასებლად.</li>
            <li>კანონმდებლობით გათვალისწინებული ვალდებულებების შესასრულებლად.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">4. Meta Lead Generation</h2>
          <p className="text-base text-foreground-subtle">
            როდესაც ავსებთ Facebook-ის ან Instagram-ის Lead Generation ფორმას, თქვენს მიერ მითითებული მონაცემები
            (სახელი, ელფოსტა, ტელეფონი) Meta Platforms, Inc.-ისგან გადმოგვეცემა. ვიყენებთ ამ მონაცემებს მხოლოდ
            იმისთვის, რომ თქვენთვის ვუპასუხოთ მოთხოვნაზე და მოგაწოდოთ კურსის ინფორმაცია. Meta-ის სერვისების გამოყენება
            რეგულირდება <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Meta-ის კონფიდენციალურობის პოლიტიკით</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">5. მონაცემთა გაზიარება</h2>
          <p className="text-base text-foreground-subtle">
            ჩვენ <strong>არ ვყიდით</strong> და არ ვაჯავშნათ თქვენს პერსონალურ მონაცემებს მესამე პირებზე. მონაცემთა
            დამუშავებაში გვეხმარება შემდეგი სანდო პარტნიორები:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground-subtle">
            <li><strong>Supabase</strong> — მონაცემთა ბაზის ჰოსტინგი (EU რეგიონი).</li>
            <li><strong>Vercel</strong> — ვებგვერდის ჰოსტინგი.</li>
            <li><strong>Google Workspace</strong> — ელფოსტა და Google Sheets რეგისტრაციის სარეზერვო ჩანაწერებისთვის.</li>
            <li><strong>Meta Platforms</strong> — Lead Generation ფორმების მიწოდება და სარეკლამო ანალიტიკა.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">6. მონაცემთა შენახვის ვადა</h2>
          <p className="text-base text-foreground-subtle">
            სარეგისტრაციო ინფორმაცია ინახება არა უმეტეს 24 თვის განმავლობაში ბოლო კონტაქტიდან, ან მანამ, სანამ არ
            მოითხოვთ წაშლას. ფინანსური ჩანაწერები ინახება საქართველოს კანონმდებლობით გათვალისწინებული ვადით (6 წელი).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">7. თქვენი უფლებები</h2>
          <p className="text-base text-foreground-subtle">თქვენ გაქვთ უფლება მოითხოვოთ:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground-subtle">
            <li>თქვენს შესახებ შენახული მონაცემების ნახვა.</li>
            <li>არასწორი მონაცემების შესწორება.</li>
            <li>მონაცემების სრულად წაშლა (მარკეტინგული მიზნებისთვის).</li>
            <li>დამუშავების შეზღუდვა ან ამის წინააღმდეგ პროტესტი.</li>
            <li>თქვენი თანხმობის ნებისმიერ დროს გამოწვევა.</li>
          </ul>
          <p className="text-base text-foreground-subtle">
            მოთხოვნის გასაგზავნად დაგვიკავშირდით:{' '}
            <a href="mailto:info@blueberryedu.ge" className="text-brand hover:underline">info@blueberryedu.ge</a>.
            მოთხოვნაზე ვუპასუხებთ 30 დღის განმავლობაში.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">8. უსაფრთხოება</h2>
          <p className="text-base text-foreground-subtle">
            ვიყენებთ ინდუსტრიის სტანდარტულ ტექნიკურ და ორგანიზაციულ ზომებს — დაშიფვრა (HTTPS/TLS), წვდომის კონტროლი,
            რეგულარული უსაფრთხოების აუდიტი — თქვენი მონაცემების დასაცავად.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">9. ქუქი-ფაილები (Cookies)</h2>
          <p className="text-base text-foreground-subtle">
            ვებგვერდი იყენებს მინიმალურ ტექნიკურ ქუქი-ფაილებს სესიის მართვისა და სერვისის ფუნქციონალურობისთვის.
            მესამე მხარის ანალიტიკური ქუქი-ფაილები (Meta Pixel) გამოიყენება მხოლოდ თქვენი თანხმობით.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">10. ბავშვები</h2>
          <p className="text-base text-foreground-subtle">
            სერვისი არ არის განკუთვნილი 16 წელზე ნაკლები ასაკის პირებისთვის. ჩვენ შეგნებულად არ ვაგროვებთ მათ მონაცემებს.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">11. პოლიტიკის ცვლილებები</h2>
          <p className="text-base text-foreground-subtle">
            ვიტოვებთ უფლებას, განვაახლოთ ეს პოლიტიკა. ცვლილებები ძალაში შედის ვებგვერდზე გამოქვეყნების მომენტიდან.
            არსებითი ცვლილების შემთხვევაში გაცნობებთ ელფოსტით.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">12. კონტაქტი</h2>
          <p className="text-base text-foreground-subtle">
            კონფიდენციალურობასთან დაკავშირებული ნებისმიერი კითხვისთვის:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground-subtle">
            <li>ელფოსტა: <a href="mailto:info@blueberryedu.ge" className="text-brand hover:underline">info@blueberryedu.ge</a></li>
            <li>ვებგვერდი: <a href="https://blueberryedu.ge" className="text-brand hover:underline">blueberryedu.ge</a></li>
          </ul>
        </section>
      </article>

      <LandingFooter />
    </div>
  );
}
