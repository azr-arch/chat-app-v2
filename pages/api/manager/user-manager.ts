import { Socket } from "socket.io";

export interface User {
    id: string;
    name: string;
    socket: Socket;
}

export class UserManager {
    private users: User[];

    constructor() {
        this.users = [];
    }

    addUser(user: User) {
        const existingUserIndex = this.users.findIndex((u) => u.id === user.id);

        if (existingUserIndex !== -1) {
            // User already exists, update the socket
            this.users[existingUserIndex].socket = user.socket;
            console.log(`User ${user.name} updated.`);
        } else {
            // User doesn't exist, add it
            this.users.push(user);
            console.log(`User ${user.name} added.`);
        }
    }

    removeUser(socket: Socket) {
        this.users = this.users.filter((user) => user.socket !== socket);
    }

    getAvailableUsers() {
        return this.users.length;
    }
}
