import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { contactController } from "../controllers/ContactController";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware as any);

router.post(
    "/",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("phone").notEmpty().withMessage("Phone number is required"),
    ],
    (req: Request, res: Response, next: NextFunction) => contactController.createContact(req as AuthRequest, res, next)
);

router.get("/", (req: Request, res: Response, next: NextFunction) => contactController.getAllContacts(req as AuthRequest, res, next));
router.get("/:id", (req: Request, res: Response, next: NextFunction) => contactController.getContact(req as AuthRequest, res, next));
router.put("/:id", (req: Request, res: Response, next: NextFunction) => contactController.updateContact(req as AuthRequest, res, next));
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => contactController.deleteContact(req as AuthRequest, res, next));

export default router;
