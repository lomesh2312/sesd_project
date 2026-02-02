const ContactService = require("../services/ContactService");
const ApiResponse = require("../utils/ApiResponse");
const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

class ContactController {
    async createContact(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ApiError(400, "Validation Error", errors.array());
            }

            const contact = await ContactService.createContact(req.user.id, req.body);
            res.status(201).json(new ApiResponse(201, contact, "Contact created successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getContact(req, res, next) {
        try {
            const contact = await ContactService.getContactById(req.user.id, req.params.id);
            res.status(200).json(new ApiResponse(200, contact, "Contact retrieved successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getAllContacts(req, res, next) {
        try {
            const result = await ContactService.getAllContacts(req.user.id, req.query);
            res.status(200).json(new ApiResponse(200, result, "Contacts retrieved successfully"));
        } catch (error) {
            next(error);
        }
    }

    async updateContact(req, res, next) {
        try {
            const contact = await ContactService.updateContact(req.user.id, req.params.id, req.body);
            res.status(200).json(new ApiResponse(200, contact, "Contact updated successfully"));
        } catch (error) {
            next(error);
        }
    }

    async deleteContact(req, res, next) {
        try {
            await ContactService.deleteContact(req.user.id, req.params.id);
            res.status(200).json(new ApiResponse(200, null, "Contact deleted successfully"));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ContactController();
