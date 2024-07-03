import { UserManager } from "@/pages/api/manager/user-manager";

declare global {
    var userManager: UserManager | undefined;
}

export const userDb = globalThis.userManager || new UserManager();
if (process.env.NODE_ENV !== "production") globalThis.userManager = userDb;
