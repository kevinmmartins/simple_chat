"use strict";
let history = [];
const check_history=  (connection) =>{
    if (history.length > 0) {
        connection.sendUTF(JSON.stringify({ type: 'history', data: history }));
    }
}
exports.check_history = check_history;
exports.history= history;
