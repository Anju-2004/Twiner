// const { sequelize } = require(".");

// Initializing tweets model
module.exports = (sequelize, DataTypes) => {
    const tweets = sequelize.define("tweets", { // defining the 'tweets' table 
        twid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        twheading: {
            type: DataTypes.STRING,
            allowNull: false
        },
        twtext: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "users", // referenced table 
                key: "userid", // referenced column
            },
            allowNull: false,
        },
        media: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        numlikes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        numretweets: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        hashtags: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        mentions: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
        {
            tableName: "tweets", // The table name in the database.
            createdAt: "twtime", // The column name for creation timestamp.
            updatedAt: false // Disable automatic update timestamp.
        });
    return tweets;
}
