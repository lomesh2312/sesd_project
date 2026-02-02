import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { contactService } from "../services/ContactService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

class ContactController {
    async createContact(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, "Validation Error", errors.array());
            }

            const contact = await contactService.createContact(req.user.id, req.body);
            res.status(201).json(new ApiResponse(201, contact, "Contact created successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getContact(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const contact = await contactService.getContactById(req.user.id, req.params.id as string);
            res.status(200).json(new ApiResponse(200, contact, "Contact retrieved successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getAllContacts(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await contactService.getAllContacts(req.user.id, req.query);
            res.status(200).json(new ApiResponse(200, result, "Contacts retrieved successfully"));
        } catch (error) {
            next(error);
        }
    }

    async updateContact(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const contact = await contactService.updateContact(req.user.id, req.params.id as string, req.body);
            res.status(200).json(new ApiResponse(200, contact, "Contact updated successfully"));
        } catch (error) {
            next(error);
        }
    }

    async deleteContact(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await contactService.deleteContact(req.user.id, req.params.id as string);
            res.status(200).json(new ApiResponse(200, null, "Contact deleted successfully"));
        } catch (error) {
            next(error);
        }
    }
}

export const contactController = new ContactController();
