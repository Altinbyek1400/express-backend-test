const fs = require('fs');
const path = require('path');

exports.readRoutes = (app) => {
    fs.readdirSync(path.join(__dirname, '../routes')).forEach((file) => {
        let route = require(`../routes/${file}`);
        let routeName = file.split('.')[0].toLowerCase();
        app.use(`/${routeName}`, route);
    });
};