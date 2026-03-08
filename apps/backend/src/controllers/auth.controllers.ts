import type { Response, Request } from "express";
import { registerSchema } from "@repo/types";
import { register as registerService } from "../services/auth.services.js";
import { HttpError } from "../utils/httpErrors.js";

export async function register(req: Request, res: Response){
    //validation
    const result = registerSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message: "Invalid data",
        })
    }

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