// Supabase Edge Function — handles new registrations
// Sends data to Google Sheets + sends confirmation email via Resend
// Triggered by database webhook on INSERT to course_registrations / masterclass_registrations

const GOOGLE_SHEETS_URL = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL') ?? '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') ?? 'info@blueberry.academy';

interface RegistrationPayload {
  type: 'INSERT';
  table: string;
  record: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    course_id?: number;
    masterclass_id?: number;
    created_at: string;
  };
}

Deno.serve(async (req) => {
  try {
    const payload: RegistrationPayload = await req.json();
    const { record, table } = payload;
    const type = table === 'course_registrations' ? 'კურსი' : 'მასტერკლასი';

    // 1. Google Sheets
    if (GOOGLE_SHEETS_URL) {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: record.full_name,
          email: record.email,
          phone: record.phone,
          type,
          course_id: record.course_id ?? record.masterclass_id ?? '',
          created_at: record.created_at,
        }),
      });
    }

    // 2. Email to registrant
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Blueberry Academy <noreply@blueberryedu.ge>',
          to: [record.email],
          subject: `რეგისტრაცია დადასტურდა — Blueberry Academy`,
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h2 style="color: #004aad;">მადლობა რეგისტრაციისთვის!</h2>
              <p>გამარჯობა, <strong>${record.full_name}</strong>!</p>
              <p>შენი რეგისტრაცია ${type}ზე წარმატებით მიღებულია.</p>
              <p>ჩვენი გუნდი დაგიკავშირდება მალე დეტალური ინფორმაციისთვის.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px;">Blueberry Academy — blueberryedu.ge</p>
            </div>
          `,
        }),
      });
    }

    // 3. Notify admin
    if (RESEND_API_KEY && ADMIN_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Blueberry Academy <noreply@blueberryedu.ge>',
          to: [ADMIN_EMAIL],
          subject: `ახალი რეგისტრაცია — ${record.full_name}`,
          html: `
            <div style="font-family: sans-serif;">
              <h3>ახალი ${type} რეგისტრაცია</h3>
              <p><strong>სახელი:</strong> ${record.full_name}</p>
              <p><strong>ემეილი:</strong> ${record.email}</p>
              <p><strong>ტელეფონი:</strong> ${record.phone}</p>
              <p><strong>თარიღი:</strong> ${new Date(record.created_at).toLocaleString('ka-GE')}</p>
            </div>
          `,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
