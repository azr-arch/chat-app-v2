export interface User {
    id: string;
    username: string;
    image: string;
    email: string;
}

export class UserManager {
    private activeUsers: Map<string, User>;

    constructor() {
        this.activeUsers = new Map();
    }

    addUser(user: User) {
        this.activeUsers.set(user.id, user);
    }

    removeUser(user: User) {
        this.activeUsers.delete(user.id);
    }

    getActiveUsers() {
        return Array.from(this.activeUsers.values());
    }
}

// const UserManager
