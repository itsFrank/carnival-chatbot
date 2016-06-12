import * as http from 'http';
import * as express from 'express';
import { Router } from './server/routes/routes'

const app:express.Application = express();
 
const port:number = 6969;
 
app.use('/' , express.static('client'));

//Add routes to app
Router.bindRoutes(app);

const server:http.Server = app.listen(port, () => {
    const {address} = server.address();
    console.log('Listening on ' + address + ":" + port);
});

server.on("error", (error:any) => {
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
})