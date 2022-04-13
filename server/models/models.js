const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define( 'users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    date_regist: {type: DataTypes.DATE},
    last_login: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING}
});

const Email = sequelize.define( 'email_box', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    receiverId: {type: DataTypes.INTEGER},
    title: {type: DataTypes.STRING},
    message: {type: DataTypes.TEXT},
    date: {type: DataTypes.DATE},
    status: {type: DataTypes.STRING}
});

User.hasMany(Email);
Email.belongsTo(User);

module.exports = {
    User,
    Email
};