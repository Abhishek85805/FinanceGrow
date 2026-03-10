export class HttpError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export class ConflictError extends HttpError {
    constructor(message = 'Conflict'){
        super(message, 409);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export class BadRequestError extends HttpError {
    constructor(message = 'Bad Request'){
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
