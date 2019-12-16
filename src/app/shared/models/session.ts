import { User } from './user';

export class Session {
    user: User;
    accessToken: string;
    refreshToken: string;

    constructor(user: User, accessToken: string, refreshToken: string) {
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}