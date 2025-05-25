import googleConfig from "../config/googleConfig";
import { createCallWithEventReminder } from "../config/twillo";
import User from "../model/userModel";
import { google } from "googleapis";

export const triggerReminder = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.phoneNumber) {
      return res.status(400).json({ message: "Phone number not found" });
    }

    googleConfig.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: googleConfig });

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 1,
    });

    const event = response.data.items?.[0];
    if (!event) {
      return res.status(404).json({ message: "No upcoming events found" });
    }

    const call = await createCallWithEventReminder({
      title: event.summary || "",
      startTime: event.start?.dateTime || event.start?.date || "",
      location: event.location ? event.location : undefined,
      description: event.description ? event.description : undefined,
      phoneNumber: user.phoneNumber!,
    });

    return res.status(200).json({ message: "Reminder triggered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
