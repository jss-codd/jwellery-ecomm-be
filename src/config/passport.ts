import bcrypt from "bcryptjs";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { env } from "./env";
import { userRepository } from "../modules/user/repository/user.repository";
import { HttpError } from "../utils/httpError";

type JwtPayload = {
  sub: string;
  role_id: string;
  role_name: string;
  email: string;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await userRepository.findByEmail(email);
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid || user.is_blocked) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.admin_token ?? null,
      ]),
      secretOrKey: env.JWT_SECRET,
    },
    async (payload: JwtPayload, done) => {
      try {
        const user = await userRepository.findById(payload.sub);
        if (!user || user.is_blocked) {
          return done(new HttpError(401, "Unauthorized"), false);
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error, false);
      }
    },
  ),
);

export { passport };
