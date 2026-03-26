import "dotenv/config";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { verifyUserService } from "../services/auth.service";
import { NotFoundException } from "../utils/appError";
import { ProviderEnum } from "../enums/account-provider.enum";
import { loginOrCreateAccountService } from "../services/auth.service";
import UserModel from "../models/user.model";
import { signJwtToken } from "../utils/jwt";
import { Strategy as JwtStrategy,ExtractJwt,StrategyOptions } from "passport-jwt";
import { config } from "./app.config";
import { findUserByIdService } from "../services/auth.service";


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth env variables are missing");
}

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
            passReqToCallback: true,
        },

        async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                const { email, sub: googleId, picture } = profile._json;
                console.log(profile, "profile");
                console.log(googleId, "googleId");

                if (!googleId) {
                    throw new NotFoundException("Google ID(sub) not found");
                }
                const { user } = await loginOrCreateAccountService({
                    provider: ProviderEnum.GOOGLE,
                    displayName: profile.displayName,
                    providerId: googleId,
                    picture: picture,
                    email: email,
                });
                const jwt  = signJwtToken({ userId: user._id})
                req.jwt = jwt;
                return done(null, user);
                
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
        async (email, password, done) => {
            try {
                const user = await verifyUserService({ email, password });
                return done(null, user);
            } catch (error: any) {
                return done(error, false, { message: error?.message });
            }
        }
    )
);

interface JwtPayload {
    userId: string;
}

const options:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
    audience: ["user"],
    algorithms:["HS256"]
};

passport.use(
    new JwtStrategy(options,async(payload:JwtPayload,done) => {
        try{
            const user = await findUserByIdService(payload.userId);
            if(!user){
                return done(null,false);
            }
            return done(null,user);
        }catch(error){
            return done(error,false);
        }
    })
)

passport.serializeUser((user: any, done: any) => {
    done(null, user);
});

passport.deserializeUser(async (user: any, done: any) => {
    done(null,user);
});

// export const passportAuthenticateJWT = passport.authenticate("jwt",{
//     session:false,                                       
// });

export const passportAuthenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("JWT middleware hit 🔥");

  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      console.log("Passport callback 🔥");
      console.log("err:", err);
      console.log("user:", user);
      console.log("info:", info);

      if (err) return next(err);

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};