// followid
// userdid
// followingid
// models/Follower.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./User');
// const users = require('./users');

const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Follower = sequelize.define('Follower', {
        followid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        followingid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // // associations
    // Follower.belongsTo(users, { foreignKey: 'userid', as: 'follower' });
    // Follower.belongsTo(users, { foreignKey: 'followingid', as: 'following' });

    sequelize.sync();
    return Follower;
}



