import jwt,{ SignOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model"
import { config } from "../config/app.config";

export type AccessTPayload = {
    userId: UserDocument["_id"];

} 

type SignOptsAndSecret = SignOptions & {
    secret: string;
};

const defaults: SignOptions = {
    audience: ["user"],
}

export const accessTokenSignOptions: SignOptsAndSecret = {
    expiresIn: config.JWT_EXPIRES_IN as any,
    secret: config.JWT_SECRET,
}

export const signJwtToken = (
    payload: AccessTPayload,
    options?:SignOptions,
) => {

    return jwt.sign(payload,config.JWT_SECRET,{
        ...defaults,
        ...options,
    });
};