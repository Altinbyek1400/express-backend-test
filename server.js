const express = require('express');
const {readRoutes} = require('./src/utils/Route.util');
const ResponseHandler = require('./src/middleware/Response.middleware')
const cors = require('cors');
const {logger} = require('./src/configs/logger')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

async function init() {

    const corsOptions = {
        origin: ['http://localhost:3002', 'http://localhost:3000', 'http://localhost:3001',], optionsSuccessStatus: 200,
    };


    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(ResponseHandler)
    readRoutes(app);
    app.listen(process.env.PORT, () => {
        logger.info(`Server listening at http://localhost:${process.env.PORT}`);
    });
}


init().catch((err) => {
    console.error(err, 'error starting server');
})

