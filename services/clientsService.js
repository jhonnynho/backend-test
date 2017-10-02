var request = require('request');

var clientService = {};

var url = 'http://www.mocky.io/v2/5808862710000087232b75ac';

//Get user data filtered by user id
clientService.getClientsById = function (reqUserId ,id, callback) {
    var response = {}, i = 0, length = 0, cont = 0, status = 200;
    validateRole(reqUserId, function (role) {
        if(role == "user" || role == "admin") {
            request.get({
                url: url,
                json: true
            }, function (err, result, body) {
                if (!err && result.statusCode == 200) {
                    data = body;
                    length = data.clients.length;
                    for (i = 0; i < length; i++) {
                        if (data.clients[i].id == id) {
                            response = data.clients[i];
                            cont++;
                        }
                    }
                    if (cont >= 1) {
                        status = 200;
                        callback(response, status);
                    } else {
                        response = {
                            "message": "Client not found"
                        };
                        status = 200;
                        callback(response, status);
                    }
                } else {
                    response = new Error('Error retrieving data');
                    status = 500;
                    callback(response, status);
                }
            });
        }else{
            response = {
                "message": "You don't have authorization"
            };
            status = 401;
            callback(response, status);
        }
    });
};

//Get user data filtered by user name
clientService.getClientsByName = function (reqUserId, name, callback) {
    var response = {}, i = 0, length = 0, cont = 0, status = 200;
    validateRole(reqUserId, function (role) {
        if (role == "user" || role == "admin") {
            request.get({
                url: url,
                json: true
            }, function (err, result, body) {
                if (!err && result.statusCode == 200) {
                    data = body;
                    length = data.clients.length;
                    for (i = 0; i < length; i++) {
                        if (data.clients[i].name == name) {
                            response = data.clients[i];
                            cont++;
                        }
                    }
                    if (cont >= 1) {
                        status = 200;
                        callback(response, status);
                    } else {
                        response = {
                            "message": "Client not found"
                        };
                        status = 200;
                        callback(response, status);
                    }

                } else {
                    response = new Error('Error retrieving data');
                    status = 500;
                    callback(response, status);
                }
            });
        }else{
            response = {
                "message": "You don't have authorization"
            };
            status = 401;
            callback(response, status);
        }
    });
};

function validateRole(id, callback){
    var response = {}, i = 0, length = 0, cont = 0;
    request.get({
        url: url,
        json: true
    }, function (err, result, body) {
        if(!err && result.statusCode == 200){
            data = body;
            length = data.clients.length;
            for(i=0; i<length; i++){
                if(data.clients[i].id==id){
                    response = data.clients[i].role;
                    cont++;
                }
            }
            if(cont>=1){
                callback(response);
            }else {
                response = null;
                callback(response);
            }
        }else{
            response = new Error('Error retrieving data');
            callback(response);
        }
    });
}

module.exports = clientService;
