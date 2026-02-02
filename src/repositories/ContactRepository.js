const BaseRepository = require("./BaseRepository");

class ContactRepository extends BaseRepository {
    constructor() {
        super("contact");
    }

    async findAllByUserId(userId, { search, category, isFavorite, skip, take, orderBy }) {
        const where = {
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

module.exports = new ContactRepository();
