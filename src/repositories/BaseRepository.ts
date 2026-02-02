import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BaseRepository<T> {
    protected model: string;
    protected prisma: any;

    constructor(model: string) {
        this.model = model;
        this.prisma = prisma;
    }

    async create(data: any): Promise<T> {
        return this.prisma[this.model].create({ data });
    }

    async findUnique(where: any): Promise<T | null> {
        return this.prisma[this.model].findUnique({ where });
    }

    async findMany(args: any = {}): Promise<T[]> {
        return this.prisma[this.model].findMany(args);
    }

    async update(where: any, data: any): Promise<T> {
        return this.prisma[this.model].update({ where, data });
    }

    async delete(where: any): Promise<T> {
        return this.prisma[this.model].delete({ where });
    }

    async count(args: any = {}): Promise<number> {
        return this.prisma[this.model].count(args);
    }
}
