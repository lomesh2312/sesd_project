import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/UserRepository";
import { ApiError } from "../utils/ApiError";

class AuthService {
    async register(data: any) {
        const { name, email, password } = data;

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = this.generateToken(user.id);
        return { user: { id: user.id, name: user.name, email: user.email }, token };
    }

    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials");
        }

        const token = this.generateToken(user.id);
        return { user: { id: user.id, name: user.name, email: user.email }, token };
    }

    private generateToken(userId: number): string {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
    }
}

export const authService = new AuthService();
