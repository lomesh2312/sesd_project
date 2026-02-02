import { Request, Response, NextFunction } from "express";
import { authService } from "../services/AuthService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, "Validation Error", errors.array());
            }

            const result = await authService.register(req.body);
            res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authService.login(req.body.email, req.body.password);
            res.status(200).json(new ApiResponse(200, result, "Login successful"));
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
