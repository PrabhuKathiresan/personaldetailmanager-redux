/**
 * generalController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function loggedInUserInfo(req, res){
    if(req.session.authenticated){
        res.send({
            success: true,
            details: {
                name: req.session.user.name,
                id: req.session.userId
            }
        });
    } else {
        res.send({
            success: false
        });
    }
};

module.exports = {
    loggedInUserInfo
};