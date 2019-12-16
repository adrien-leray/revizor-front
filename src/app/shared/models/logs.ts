export class Logs {
    mail: string;
    password: string;

    constructor(mail: string, password: string) {
        this.mail = mail;
        this.password = password;
    }

    public toDto(): any {
        return {
            email: this.mail,
            password: this.password
        };
    }
}