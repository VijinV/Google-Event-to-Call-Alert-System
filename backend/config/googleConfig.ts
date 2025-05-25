import { google } from "googleapis";

const googleConfig = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    'postmessage'
);

export default googleConfig;
