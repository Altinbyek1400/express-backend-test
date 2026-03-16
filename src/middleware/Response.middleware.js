const {
    UnauthorizedException,
    BadRequestException,
} = require('../utils/Exception.util');
const { logger } = require('../configs/logger');
const fs = require('fs');

const responseHandler = (req, res, next) => {
    const sendResponse = (status, message, data, statusCode) => {
        return res.status(statusCode).json({ status, message, data });
    };

    // 2xx Responses
    res.success = (data, message = 'Амжилттай', statusCode = 200) =>
        sendResponse(true, message, data, statusCode);
    res.created = (data, message = 'Амжилттай', statusCode = 201) =>
        sendResponse(true, message, data, statusCode);
    res.accepted = (data, message = 'Accepted', statusCode = 202) =>
        sendResponse(true, message, data, statusCode);
    res.successNoContent = (data, message = 'No Content', statusCode = 204) =>
        sendResponse(true, message, data, statusCode);

    // 4xx Responses
    res.badRequest = (data, message = 'Bad Request', statusCode = 400) =>
        sendResponse(false, message, data, statusCode);
    res.unauthorized = (data, message = 'Unauthorized', statusCode = 401) =>
        sendResponse(false, message, data, statusCode);
    res.forbidden = (data, message = 'Forbidden', statusCode = 403) =>
        sendResponse(false, message, data, statusCode);
    res.notFound = (data, message = 'Not Found', statusCode = 404) =>
        sendResponse(false, message, data, statusCode);

    // 5xx Responses
    res.error = (message = 'Internal Server Error', data, statusCode = 500) => {
        logger.error(`Error: ${message}`, { data });

        if (data instanceof BadRequestException) {
            return sendResponse(false, data.message, data, 400);
        } else if (data instanceof UnauthorizedException) {
            return sendResponse(false, data.message, data, 401);
        }

        return sendResponse(false, 'Алдаа гарлаа.', { message, data }, statusCode);
    };

    res.file = (path, fileType) => {
        res.setHeader('Content-Type', fileType);

        if (fs.existsSync(path)) {
            const fileStream = fs.createReadStream(path);

            fileStream.on('error', (err) => {
                logger.error('Error reading file for response:', err);
                res.error('Файл олдонгүй эсвэл хандах боломжгүй.', null, 404);
            });

            fileStream.pipe(res).on('finish', () => {
                logger.info(`File served successfully: ${path}`);
            });
        } else {
            res.error('Файл олдонгүй эсвэл хандах боломжгүй.', null, 404);
            console.log('File does not exist!');
        }
    };

    next();
};

module.exports = responseHandler;


