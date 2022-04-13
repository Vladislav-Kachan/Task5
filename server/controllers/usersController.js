const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, status) => {
    return jwt.sign({id, email, status},
                    process.env.SECRET_KEY,
                    {expiresIn: '24h'});
}

class usersController {
    async registration(req, res, next) {
        const {fullName, password, email} = req.body;

        if(!fullName || !password || !email) {
            return next(ApiError.badRequest('Invalid data'));
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate) {
            return next(ApiError.badRequest('User already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        let today = new Date();
        const user = await User.create({fullName, password: hashPassword, email, date_regist: today, last_login: today,  status: 'active'});
        const token = generateJwt(user.id, user.fullName, email, user.status)
        return res.json({token});
    };

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) {
            return next(ApiError.badRequest('User not exists'));
        };
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.badRequest('Invalid password'));
        };
        if (user.status == "blocked") {
            return next(ApiError.badRequest('User blocked'));
        }
        let today = new Date();
        user.last_login = today;
        await user.save();
        const token = generateJwt(user.id, user.email, user.status);
        return res.json(token);
    };

    async getAll(req, res) {
        let data = [];
        const users = await User.findAll();
        users.forEach(e => {            
            data.push({
                id: e.id,
                fullName: e.fullName,
                email: e.email,
                date_regist: e.date_regist,
                last_login: e.last_login,
                status: e.status
            });
        });    
        
        return res.json(data);
    };

    async deleteUser(req, res) {
        const {email} = req.body;        
        await User.destroy({where: {email}});
        let data = [];
        const users = await User.findAll();
        users.forEach(e => {            
            data.push({
                id: e.id,
                fullName: e.fullName,
                email: e.email,
                date_regist: e.date_regist,
                last_login: e.last_login,
                status: e.status
            });
        });    
        return res.json(data);
    };

    async blockUser(req, res) {
        const {email} = req.body;      
        await User.update({status: 'blocked'},{where: {email}});
        let data = [];
        const users = await User.findAll();
        users.forEach(e => {            
            data.push({
                id: e.id,
                fullName: e.fullName,
                email: e.email,
                date_regist: e.date_regist,
                last_login: e.last_login,
                status: e.status
            });
        });    
        return res.json(data);
    };

    async unlockUser(req, res) {
        const {email} = req.body;        
        await User.update({status: 'active'},{where: {email}});
        let data = [];
        const users = await User.findAll();
        users.forEach(e => {            
            data.push({
                id: e.id,
                fullName: e.fullName,
                email: e.email,
                date_regist: e.date_regist,
                last_login: e.last_login,
                status: e.status
            });
        });    
        return res.json(data);
    };

}

module.exports = new usersController();