const ApiError = require('../error/ApiError');
const {Email, User} = require('../models/models');

class emailController {

    async newMail(req, res, next) {
        const {userId, receiverId, title, message} = req.body;
        
        let today = new Date();
        try {
            console.log(userId, receiverId, title, message)
            await Email.create({userId, receiverId, title, message, date: today,  status: 'Unread'});
        } catch(e) {
            return next(ApiError.badRequest('Cannot send message'));
        }
        
        return res.json("ok");
    };

    async getMail(req, res, next) {
        const { receiverId } = req.body;
        let email = [];
        try {
             email = await Email.findAll({
                where: {receiverId},
                include: [{
                    model: User,
                    attributes: ['email']
                }]}); 
            } catch(e) {
                return next(ApiError.badRequest('Cannot get message'));
            }
        return res.json(email);
    };

    async updateState(req, res, next) {
        const {id} = req.body;              
        try {
            await Email.update({status: 'Read'},{where: {id}});
        } catch(e) {
            return next(ApiError.badRequest('Cannot update message'));
        }       
        return res.json('ok');
    };

}

module.exports = new emailController();