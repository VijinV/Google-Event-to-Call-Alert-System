import cron from "node-cron";
import mongoose from "mongoose";
import { google } from "googleapis";
import User from "../model/userModel";
import googleConfig from "../config/googleConfig";
import dotenv from "dotenv";
import { createCallWithEventReminder } from "../config/twillo";

dotenv.config();
mongoose.connect(process.env.MONGO_URI!);

export const calenderCron = cron.schedule("* * * * *", async () => {
  try {
    const users = await User.find({
      googleAccessToken: { $exists: true, $ne: null },
      phoneNumber: { $exists: true, $ne: "" },
    });

    for (const user of users) {
      googleConfig.setCredentials({
        access_token: user.googleAccessToken,
        refresh_token: user.googleRefreshToken,
      });

      const calendar = google.calendar({ version: "v3", auth: googleConfig });
      const now = new Date();
      const fiveMinsLater = new Date(now.getTime() + 5 * 60 * 1000);

      const response = await calendar.events.list({
        calendarId: "primary",
        timeMin: now.toISOString(),
        timeMax: fiveMinsLater.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      });

      const events = response.data.items || [];

      const existingEventIds = new Set(user.calls.map((call: any) => call.id));

      const newEventsToCall = events.filter((event) => {
        return event.id && !existingEventIds.has(event.id);
      });

      for (const event of newEventsToCall) {
        await createCallWithEventReminder({
          title: event.summary || "",
          startTime: event.start?.dateTime || event.start?.date || "",
          location: event.location || undefined,
          description: event.description || undefined,
          phoneNumber: user.phoneNumber!,
        });

        user.calls.push({
          id: event.id,
          summary: event.summary,
          start: event.start,
          location: event.location,
          description: event.description,
        });
      }

      await user.save();
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
