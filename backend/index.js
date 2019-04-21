"use strict";

const { check_history, history } = require("./check_history");
const webSocketServer = require('websocket').server;
const colors = require('./colors').default
const htmlEntities = require('./string-utils')
const {server} = require('./server')
const clients = [];

const wsServer = new webSocketServer({
    httpServer: server
});
wsServer.on('request', (request) => {
    console.log('Connection from origin '
        + request.origin + '.');
    const connection = request.accept(null, request.origin);
    const index = clients.push(connection) - 1;
    let userName = false;
    let userColor = false;
    console.log('Connection accepted.');
    check_history(connection);
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            if (userName === false) {
                userName = htmlEntities(message.utf8Data);
                userColor = colors.shift();
                connection.sendUTF(
                    JSON.stringify({ type: 'color', data: userColor }));
                console.log('User is known as: ' + userName
                    + ' with ' + userColor + ' color.');
            } else {
                console.log('Received Message from '
                    + userName + ': ' + message.utf8Data);
                const obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor
                };
                history.push(obj);
                history = history.slice(-100);
                const json = JSON.stringify({ type: 'message', data: obj });
                clients.forEach(client => {
                    client.sendUTF(json);
                });
            }
        }
    });
    connection.on('close', (connection) => {
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });
});


