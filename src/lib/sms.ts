export async function sendSMS(to: string, text: string) {
  try {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM) {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`
      const body = new URLSearchParams({ To: to, From: process.env.TWILIO_FROM!, Body: text })
      await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      })
    } else if (process.env.SMSAPI_TOKEN && process.env.SMSAPI_FROM) {
      await fetch('https://api.smsapi.pl/sms.do', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + process.env.SMSAPI_TOKEN, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ to, from: process.env.SMSAPI_FROM!, message: text })
      })
    }
  } catch (e) { console.error('SMS error:', e) }
}
