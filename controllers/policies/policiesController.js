var policyService = require('../../services/policyService');

var policyController = {};

policyController.getClientPolicyDetail = function (req, res) {
    var nameExists = req.query.name!=undefined,
        name = req.query.name,
        reqUserIdExist = req.headers.user_id!=undefined;
        reqUserId = req.headers.user_id;
    if(reqUserIdExist) {
        if (nameExists) {
            policyService.getClientPolicyDetail(reqUserId, name, function (client, status) {
                res.status(status).json(client);
            });
        }else{
            res.json({
                "message": "Client Name not received"
            });
        }
    }else{
        res.json({
            "message": "Requester User ID not received"
        })
    }
};

policyController.getClientByPolicy = function (req, res) {
    var policyExists = req.query.policy!=undefined,
        policy = req.query.policy,
        reqUserIdExist = req.headers.user_id!=undefined;
        reqUserId = req.headers.user_id;
    if(reqUserIdExist) {
        if (policyExists) {
            policyService.getClientByPolicy(reqUserId, policy, function (client, status) {
                res.status(status).json(client);
            });
        }else{
            res.json({
                "message": "Policy Number not received"
            });
        }
    }else{
        res.json({
            "message": "Requester User ID not received"
        })
    }
};

module.exports = policyController;
