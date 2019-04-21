"use strict";
const webSocketsServerPort = process.env.WEBSOCKET_PORT;
const http = require('http');
const server = http.createServer();
server.listen(webSocketsServerPort, () =>
    console.log("Server is listening on port "
        + webSocketsServerPort));
exports.server= server;