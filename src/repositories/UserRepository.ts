import { User } from "@prisma/client";
import { BaseRepository } from "./BaseRepository.js";

class UserRepository extends BaseRepository<User> {
    constructor() {
        super("user");
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.findUnique({ email });
    }
}

export const userRepository = new UserRepository();
