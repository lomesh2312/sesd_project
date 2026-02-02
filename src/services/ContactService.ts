import { contactRepository } from "../repositories/ContactRepository";
import { ApiError } from "../utils/ApiError";

class ContactService {
    async createContact(userId: number, data: any) {
        return contactRepository.create({ ...data, userId });
    }

    async getContactById(userId: number, contactId: string | number) {
        const contact = await contactRepository.findUnique({ id: Number(contactId) });
        if (!contact) {
            throw new ApiError(404, "Contact not found");
        }

        if (contact.userId !== userId) {
            throw new ApiError(403, "You do not have permission to view this contact");
        }

        return contact;
    }

    async getAllContacts(userId: number, query: any) {
        const { search, category, isFavorite, page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = query;
        const skip = (page - 1) * limit;
        const take = Number(limit);
        const orderBy = { [sortBy]: order };

        return contactRepository.findAllByUserId(userId, {
            search,
            category,
            isFavorite,
            skip,
            take,
            orderBy,
        });
    }

    async updateContact(userId: number, contactId: string | number, data: any) {
        await this.getContactById(userId, contactId);
        return contactRepository.update({ id: Number(contactId) }, data);
    }

    async deleteContact(userId: number, contactId: string | number) {
        await this.getContactById(userId, contactId);
        return contactRepository.delete({ id: Number(contactId) });
    }
}

export const contactService = new ContactService();
