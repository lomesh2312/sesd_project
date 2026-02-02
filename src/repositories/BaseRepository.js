const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BaseRepository {
    constructor(model) {
        this.model = model;
        this.prisma = prisma;
    }

    async create(data) {
        return this.prisma[this.model].create({ data });
    }

    async findUnique(where) {
        return this.prisma[this.model].findUnique({ where });
    }

    async findMany(args = {}) {
        return this.prisma[this.model].findMany(args);
    }

    async update(where, data) {
        return this.prisma[this.model].update({ where, data });
    }

    async delete(where) {
        return this.prisma[this.model].delete({ where });
    }

    async count(args = {}) {
        return this.prisma[this.model].count(args);
    }
}

module.exports = BaseRepository;
