import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

interface CalendarEvent {
  title: string;
  startTime: string;
  location?: string;
  description?: string;
  phoneNumber: string;
}

export async function createCallWithEventReminder(event: CalendarEvent) {
  const { title, startTime, location, description, phoneNumber } = event;

  const msg = `You have an upcoming event titled: ${title}. 
    It starts in 5 minutes, at ${new Date(startTime).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    )}.
    ${location ? `The location is ${location}.` : ""}
    ${description ? `Details: ${description}.` : ""}
    Please be prepared.`;

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="alice" language="en-US">${msg}</Say>
    </Response>`;

  const call = await client.calls.create({
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: `+${phoneNumber}`,
    twiml,
  });

  console.log("Reminder Call SID:", call.sid);
}
