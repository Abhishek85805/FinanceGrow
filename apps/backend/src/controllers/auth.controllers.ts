import type { Response, Request } from "express";
import { registerSchema, loginSchema } from "@repo/types";
import { 
    register as registerService, 
    login as loginService 
} from "../services/auth.services.js";
import { HttpError } from "../utils/httpErrors.js";

export async function register(req: Request, res: Response){
    //validation
    const result = registerSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message: "Invalid data",
        })
    }

    //call register service
    try{
        const user = await registerService(result.data);
        return res.status(201).json({
            message: "user registered successfully",
            user,
        });
    } catch (error) {
        if(error instanceof HttpError){
            return res.status(error.statusCode).json({ 
                message: error.message 
            });
        }
        console.error(error);
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

export async function login(req: Request, res: Response){
    //validation
    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message: "Invalid data"
        });
    }

    //call login service
    try {
        const data = await loginService(result.data);
        return res.status(200).json({
            message: "user login successfully",
            data,
        });
    } catch (error) {
        if(error instanceof HttpError){
            return res.status(error.statusCode).json({ 
                message: error.message 
            });
        }
        console.error(error);
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}