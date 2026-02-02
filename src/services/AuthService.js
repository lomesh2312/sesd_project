const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");
const ApiError = require("../utils/ApiError");

class AuthService {
    async register(data) {
        const { name, email, password } = data;

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = this.generateToken(user.id);
        return { user: { id: user.id, name: user.name, email: user.email }, token };
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
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

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    }
}

module.exports = new AuthService();
