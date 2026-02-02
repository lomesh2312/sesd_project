const AuthService = require("../services/AuthService");
const ApiResponse = require("../utils/ApiResponse");
const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

class AuthController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, "Validation Error", errors.array());
            }

            const result = await AuthService.register(req.body);
            res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body.email, req.body.password);
            res.status(200).json(new ApiResponse(200, result, "Login successful"));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
