import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies?.token]),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      console.log(payload);
      return done(null, payload);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export default passport;
