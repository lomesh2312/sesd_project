const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
    constructor() {
        super("user");
    }

    async findByEmail(email) {
        return this.findUnique({ email });
    }
}

module.exports = new UserRepository();
