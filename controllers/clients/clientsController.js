var clientService = require('../../services/clientsService');

var clientsController = {};

clientsController.getClient = function (req, res) {
    var nameExists = req.query.name!=undefined,
        idExists = req.query.id!=undefined,
        name = req.query.name,
        id = req.query.id,
        reqUserIdExist = req.headers.user_id!=undefined;
        reqUserId = req.headers.user_id;
    if(reqUserIdExist) {
        if (idExists) {
            clientService.getClientsById(reqUserId, id, function (clients, status) {
                res.status(status).json(clients);
            });
        }
        if (nameExists) {
            clientService.getClientsByName(reqUserId, name, function (clients, status) {
                res.status(status).json(clients);
            });
        }
        if (!idExists && !nameExists) {
            res.json({
                "message": "ID or Name of client not received"
            });
        }
    }else{
        res.json({
            "message": "Requester User ID not received"
        })
    }
};

module.exports = clientsController;