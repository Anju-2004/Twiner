// activityid int primary key auto_increment,
// twid int references tweet(twid),
// userid int references users(userid),
// activity varchar(30),
// activitytime datetime 

// Importing required modules: Sequelize and DataTypes
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
    // Defining the TweetActivity model for the database table
    const TweetActivity = sequelize.define('TweetActivity', {
        activityid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // userid: Foreign key referencing the userid column in the users table
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Reference to the users table
                key: 'userid' // Column to reference in the users table
            }
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activitytime: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    return TweetActivity;
}
// Exporting model for use in other modules
// module.exports = TweetActivity;
