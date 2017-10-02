var request = require('request');

var policyService = {};

var urlPolicy = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
var urlUser = 'http://www.mocky.io/v2/5808862710000087232b75ac';

//Get the user linked to a policy number
policyService.getClientByPolicy = function (reqUserId, id, callback) {
    var response = {}, i = 0, length = 0, cont = 0, status = 200;
    validateRole(reqUserId, function (role) {
        if(role == "admin") {
            request.get({
                url: urlPolicy,
                json: true
            }, function (err, result, body) {
                if (!err && result.statusCode == 200) {
                    data = body;
                    length = data.policies.length;
                    for (i = 0; i < length; i++) {
                        if (data.policies[i].id == id) {
                            response = data.policies[i].clientId;
                            cont++;
                        }
                    }
                    if (cont >= 1) {
                        getUser(response, function (response) {
                            status = 200;
                            callback(response, status);
                        });
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

//Get the list of policies linked to a user name
policyService.getClientPolicyDetail = function (reqUserId, name, callback) {
    var response = {}, i = 0, length = 0, cont = 0, status = 200;
    validateRole(reqUserId, function (role) {
        if(role == "admin") {
            request.get({
                url: urlUser,
                json: true
            }, function (err, result, body) {
                if (!err && result.statusCode == 200) {
                    data = body;
                    length = data.clients.length;
                    for (i = 0; i < length; i++) {
                        if (data.clients[i].name == name) {
                            response = data.clients[i].id;
                            cont++;
                        }
                    }
                    if (cont >= 1) {
                        getPolicies(response, function (response) {
                            status = 200;
                            callback(response, status);
                        });
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

function getUser(clientId, callback) {
    var response = {}, i = 0, length = 0, cont = 0, status = 200;
    request.get({
        url: urlUser,
        json: true
    }, function (err, result, body) {
        if (!err && result.statusCode == 200) {
            data = body;
            length = data.clients.length;
            for (i = 0; i < length; i++) {
                if (data.clients[i].id == clientId) {
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
}

function getPolicies(clientId, callback) {
    var response = [], i = 0, length = 0, cont = 0, status = 200;
    request.get({
        url: urlPolicy,
        json: true
    }, function (err, result, body) {
        if (!err && result.statusCode == 200) {
            data = body;
            length = data.policies.length;
            for (i = 0; i < length; i++) {
                if (data.policies[i].clientId == clientId) {
                    response.push(data.policies[i]);
                    cont++;
                }
            }
            if (cont >= 1) {
                status = 200;
                callback(response, status);
            } else {
                response = {
                    "message": "Policies not found"
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
}

function validateRole(id, callback){
    var response = {}, i = 0, length = 0, cont = 0;
    request.get({
        url: urlUser,
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

module.exports = policyService;
