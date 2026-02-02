import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { authController } from "../controllers/AuthController";

const router = express.Router();

router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    (req: Request, res: Response, next: NextFunction) => authController.register(req, res, next)
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next)
);

export default router;
