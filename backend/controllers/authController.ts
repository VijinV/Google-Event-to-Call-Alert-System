import googleConfig from "../config/googleConfig";
import { google } from "googleapis";
import User from "../model/userModel";
import { setCookie } from "../utils/cookies";
import { jwtSign } from "../utils/jwt";

export const googleAuthController = async (req: any, res: any) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "No code" });
    }

    const googleRes = await googleConfig.getToken(code);
    googleConfig.setCredentials(googleRes.tokens);

    const user = await googleConfig.verifyIdToken({
      idToken: googleRes.tokens.id_token!,
    });

    if (!user) {
      return res.status(400).json({ message: "No user" });
    }

    const calendar = google.calendar({ version: "v3", auth: googleConfig });

    const calendarRes = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const userExists = await User.findOne({ email: user.getPayload()!.email });

    if (!userExists) {
      const newUser = new User({
        name: user.getPayload()!.name,
        email: user.getPayload()!.email,
        googleAccessToken: googleRes.tokens.access_token!,
        googleRefreshToken: googleRes.tokens.refresh_token!,
        events: calendarRes.data.items!,
        phoneNumber: "",
        tokenIssuedAt: new Date(),
        image: user.getPayload()!.picture,
      });
      await newUser.save();
    } else {
      userExists.events = calendarRes.data.items!;
      userExists.googleAccessToken = googleRes.tokens.access_token!;
      if (googleRes.tokens.refresh_token)
        userExists.googleRefreshToken = googleRes.tokens.refresh_token!;
      userExists.tokenIssuedAt = new Date();
      userExists.image = user.getPayload()!.picture;
      await userExists.save();
    }

    const token = jwtSign({
      email: user.getPayload()!.email,
      name: user.getPayload()!.name,
    });

    setCookie(res, token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.getPayload()!.name,
        email: user.getPayload()!.email,
        image: user.getPayload()!.picture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutController = async (req: any, res: any) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMeController = async (req: any, res: any) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, name } = user;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      email,
      name,
      phoneNumber: userExists.phoneNumber,
      image: userExists.image,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
