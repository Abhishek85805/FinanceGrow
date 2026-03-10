import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { StringValue } from "ms";

export async function hashPassword(password: string): Promise<string>{
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function comparePassword(storedPassword: string, userProvidedPassword: string): Promise<boolean>{
    const isPasswordCorrect = await bcrypt.compare(userProvidedPassword, storedPassword);
    return isPasswordCorrect
}

export function generateToken(payload: {userId: number}){
    const secretKey = process.env.SECRET_KEY ?? "asdfasfsdf";
    const tokenExpiryTime = (process.env.TOKEN_EXPIRY_TIME ?? "1h") as StringValue;

    const token = jwt.sign(payload, secretKey, {
        expiresIn: tokenExpiryTime
    });

    return token;
}