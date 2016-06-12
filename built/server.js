"use strict";
var express = require('express');
var routes_1 = require('./server/routes/routes');
var app = express();
var port = 6969;
app.use('/', express.static('client'));
//Add routes to app
routes_1.Router.bindRoutes(app);
var server = app.listen(port, "localhost", function () {
    var address = server.address().address;
    console.log('Listening on ' + address + ":" + port);
});
server.on("error", function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});
//# sourceMappingURL=server.js.map