export class ClientError extends Error {
    constructor(codeLevel, message) {
        super(codeLevel, message);

        this.name = 'Client Error.';
        this.status = codeLevel;
        this.message = message.toString()
    }
}