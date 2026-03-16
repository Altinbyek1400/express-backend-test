class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedException';
    }
}

class ForbiddenException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenException';
    }
}

class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestException';
    }
}

module.exports = {
    UnauthorizedException,
    ForbiddenException,
    BadRequestException,
};