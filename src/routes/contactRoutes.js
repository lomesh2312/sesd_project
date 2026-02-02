const express = require("express");
const { body } = require("express-validator");
const ContactController = require("../controllers/ContactController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("phone").notEmpty().withMessage("Phone number is required"),
    ],
    ContactController.createContact
);

router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContact);
router.put("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

module.exports = router;
