# Google Sheets Integration Setup

## 1. შექმენი Google Sheet
- გახსენი https://sheets.google.com
- ახალი Sheet → დაარქვი "Blueberry Registrations"
- პირველ row-ში ჩაწერე: `სახელი | ემეილი | ტელეფონი | ტიპი | კურსის ID | თარიღი`

## 2. Apps Script
- Extensions → Apps Script
- ჩასვი ეს კოდი:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.full_name,
    data.email,
    data.phone,
    data.type || 'course',
    data.course_id || '',
    new Date().toLocaleString('ka-GE')
  ]);
  return ContentService.createTextOutput('OK');
}
```

## 3. Deploy
- Deploy → New deployment → Web app
- Execute as: Me
- Who has access: Anyone
- Deploy → დააკოპირე URL

## 4. Supabase-ში ჩასვი
- Supabase Dashboard → Edge Functions → Secrets
- დაამატე: `GOOGLE_SHEETS_WEBHOOK_URL` = შენი Apps Script URL

## 5. Email Setup (Resend)
- დარეგისტრირდი https://resend.com
- API Keys → Create API Key
- Supabase Dashboard → Edge Functions → Secrets
- დაამატე: `RESEND_API_KEY` = შენი key
- დაამატე: `ADMIN_EMAIL` = შენი ემეილი (admin შეტყობინებისთვის)
