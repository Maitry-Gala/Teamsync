import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import {
    googleLoginCallback,
    loginController,
    logOutController,
    registerUserController,
} from "../controllers/auth.controller";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

// authRoutes.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//         session: false,
//     })
// );

authRoutes.get(
  "/google",
  (req, res, next) => {
    const returnUrl = req.query.return_url as string | undefined;
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      state: returnUrl ? Buffer.from(returnUrl).toString("base64") : undefined, // ✅ encode returnUrl in state
    })(req, res, next);
  }
);

authRoutes.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: failedUrl,
    }),
    googleLoginCallback
);

export default authRoutes;