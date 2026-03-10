import {prisma} from '../lib/prisma.js';
import { hashPassword } from "../utils/utils.js";
import { ConflictError } from "../utils/httpErrors.js";
import type { RegisterSchema } from '@repo/types';

export async function register(userData: RegisterSchema){
    //Verify whether user with same email already exist
    const userExist = await prisma.user.findFirst({
        where: {
            email: userData.email,
        }
    })
    if(userExist){
        throw new ConflictError("User with email already exist");
    }

    //Hashing a password
    const hashedPassword = await hashPassword(userData.password);

    //make entry in database
    const user = await prisma.user.create({
        data: {
            ...userData,
            lastName: userData.lastName ?? null,
            password: hashedPassword,
        },
    });

    // return safe user object (omit password)
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
}