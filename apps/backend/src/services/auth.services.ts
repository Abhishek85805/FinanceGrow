import {prisma} from '../lib/prisma.js';
import { comparePassword, hashPassword, generateToken } from "../utils/utils.js";
import { ConflictError, NotFoundError, UnauthorizedRequestError } from "../utils/httpErrors.js";
import type { RegisterSchema, LoginSchema } from '@repo/types';

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

    // return user
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
}

export async function login(userData: LoginSchema){
    //check whether email exist 
    const user = await prisma.user.findFirst({
        where: {
            email: userData.email,
        }
    });
    if(!user){
        throw new NotFoundError("Email doesn't exist");
    }

    //check if password is correct
    const isPasswordCorrect = await comparePassword(user.password, userData.password);
    if(!isPasswordCorrect){
        throw new UnauthorizedRequestError("Incorrect Password");
    }

    //generate token
    const token = generateToken({userId: user.id});

    //return token back
    return {
        user,
        token
    }
}