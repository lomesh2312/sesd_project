import { Contact } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";

class ContactRepository extends BaseRepository<Contact> {
    constructor() {
        super("contact");
    }

    async findAllByUserId(userId: number, options: { search?: string; category?: string; isFavorite?: string; skip?: number; take?: number; orderBy?: any }) {
        const { search, category, isFavorite, skip, take, orderBy } = options;

        const where: any = {
            userId,
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { phone: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ],
            }),
            ...(category && { category }),
            ...(isFavorite !== undefined && { isFavorite: isFavorite === "true" }),
        };

        const [contacts, total] = await Promise.all([
            this.findMany({
                where,
                skip,
                take,
                orderBy,
            }),
            this.count({ where }),
        ]);

        return { contacts, total };
    }
}

export const contactRepository = new ContactRepository();
