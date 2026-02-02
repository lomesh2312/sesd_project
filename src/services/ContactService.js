const ContactRepository = require("../repositories/ContactRepository");
const ApiError = require("../utils/ApiError");

class ContactService {
    async createContact(userId, data) {
        return ContactRepository.create({ ...data, userId });
    }

    async getContactById(userId, contactId) {
        const contact = await ContactRepository.findUnique({ id: Number(contactId) });
        if (!contact) {
            throw new ApiError(404, "Contact not found");
        }

        if (contact.userId !== userId) {
            throw new ApiError(403, "You do not have permission to view this contact");
        }

        return contact;
    }

    async getAllContacts(userId, query) {
        const { search, category, isFavorite, page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = query;
        const skip = (page - 1) * limit;
        const take = Number(limit);
        const orderBy = { [sortBy]: order };

        return ContactRepository.findAllByUserId(userId, {
            search,
            category,
            isFavorite,
            skip,
            take,
            orderBy,
        });
    }

    async updateContact(userId, contactId, data) {
        const contact = await this.getContactById(userId, contactId);

        return ContactRepository.update({ id: Number(contactId) }, data);
    }

    async deleteContact(userId, contactId) {
        await this.getContactById(userId, contactId);

        return ContactRepository.delete({ id: Number(contactId) });
    }
}

module.exports = new ContactService();
